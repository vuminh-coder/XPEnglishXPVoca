"use client";

import React, { useState, useEffect, useRef, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import { useNotificationStore } from "@/stores/notificationStore";
import { useListeningStore } from "@/stores/listeningStore";
import { useUiStore } from "@/stores/uiStore";
import { speakLessonText, stopTTS } from "@/shared/utils/ttsEngine";
import { LessonCoverImage } from "@/shared/components/feedback/LessonCoverImage";
import { StudioTopHeader } from "@/features/listening/components/StudioTopHeader";
import { StudioWaveformCard } from "@/features/listening/components/StudioWaveformCard";
import { InteractiveTranscriptSidebar } from "@/features/listening/components/InteractiveTranscriptSidebar";
import {
  ShadowingListingSkeleton,
  ShadowingStudioSkeleton,
} from "@/features/shadowing/components/LoadingSkeletons";
import {
  AppTopHeader,
  HeaderPillContainer,
  HeaderPillItem,
} from "@/shared/components/layout/AppTopHeader";
import { useStudyTimeTracker } from "@/shared/hooks/useStudyTimeTracker";

import { motion, AnimatePresence } from "framer-motion";
import {
  Mic,
  Play,
  RotateCcw,
  Volume2,
  Trophy,
  BookOpen,
  ChevronRight,
  ArrowLeft,
  Square,
  RefreshCw,
  Check,
  Headphones,
  Activity,
  Search,
  X,
  Clock,
  Eye,
  EyeOff,
  GraduationCap,
  FileText,
  BookmarkPlus,
  Flag,
  ListOrdered,
  ArrowRight,
  Info,
  Languages,
} from "lucide-react";
import { pick10RandomLessons } from "@/features/listening/utils/randomLessonPicker";
import { lookupWordDeep, DeepWordDefinition } from "@/features/vocabulary/data/deepDictionary";

// Helper to resolve query id (e.g. ?id=52 -> 52nd lesson or listen_052)
const resolveLessonId = (
  queryId: string | null | undefined,
  list: any[]
): string | null => {
  if (!queryId || !list || list.length === 0) return null;

  // 1. Direct match by lesson id
  const exact = list.find((l) => l.id === queryId);
  if (exact) return exact.id;

  // 2. Numeric match (e.g. ?id=52 -> 52nd lesson or listen_052)
  const num = parseInt(queryId, 10);
  if (!isNaN(num)) {
    if (num >= 1 && num <= list.length) {
      return list[num - 1].id;
    }
    const formatted = `listen_${String(num).padStart(3, "0")}`;
    const foundFormatted = list.find((l) => l.id === formatted);
    if (foundFormatted) return foundFormatted.id;
  }

  return null;
};

// Format elapsed seconds
const formatElapsedTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

function ShadowingStudioContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawIdParam = searchParams.get("id") || searchParams.get("lessonId");

  const { user, awardXp } = useAuthStore();
  const { addToast } = useNotificationStore();
  const {
    setCurrentLessonId,
    completedLessonIds,
  } = useListeningStore();
  const { setSidebarCollapsed, setHideBottomNav } = useUiStore();

  // 1. Database-backed lessons state
  const [lessonsList, setLessonsList] = useState<any[]>([]);
  const [isLoadingLessons, setIsLoadingLessons] = useState<boolean>(true);
  const [singleLessonDb, setSingleLessonDb] = useState<any | null>(null);

  // 2. Selected lesson state
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);

  // Fetch all lessons from PostgreSQL database
  useEffect(() => {
    let isMounted = true;
    async function fetchLessons() {
      try {
        setIsLoadingLessons(true);
        const res = await fetch(`/api/listening/lessons?userId=${user?.id || ""}`);
        const json = await res.json();
        if (isMounted && json.success && Array.isArray(json.data)) {
          setLessonsList(json.data);
        }
      } catch (err) {
        console.error("Failed to load lessons from database:", err);
      } finally {
        if (isMounted) setIsLoadingLessons(false);
      }
    }
    fetchLessons();
    return () => {
      isMounted = false;
    };
  }, [user?.id]);

  // Sync URL ?id= param with database lessons
  useEffect(() => {
    if (!rawIdParam) {
      setSelectedLessonId(null);
      setCurrentLessonId("");
      return;
    }

    if (lessonsList.length > 0) {
      const resolved = resolveLessonId(rawIdParam, lessonsList);
      if (resolved) {
        setSelectedLessonId(resolved);
        setCurrentLessonId(resolved);
        setSidebarCollapsed(true);
      }
    }

    // Fetch individual lesson if not found or directly via param
    async function fetchSingle() {
      try {
        const res = await fetch(`/api/listening/lessons/${rawIdParam}?userId=${user?.id || ""}`);
        const json = await res.json();
        if (json.success && json.data) {
          setSingleLessonDb(json.data);
          setSelectedLessonId(json.data.id);
          setCurrentLessonId(json.data.id);
          setSidebarCollapsed(true);
        }
      } catch (e) {
        console.error("Error fetching single lesson:", e);
      }
    }

    fetchSingle();
  }, [rawIdParam, lessonsList, setCurrentLessonId, setSidebarCollapsed, user?.id]);

  // Automatically ensure sidebar is collapsed when in studio workspace
  useEffect(() => {
    if (selectedLessonId) {
      setSidebarCollapsed(true);
      setHideBottomNav(true);
    } else {
      setHideBottomNav(false);
    }
  }, [selectedLessonId, setSidebarCollapsed, setHideBottomNav]);

  // Cleanup: restore BottomNav when leaving the page
  useEffect(() => {
    return () => setHideBottomNav(false);
  }, [setHideBottomNav]);

  const currentLesson = useMemo(() => {
    if (singleLessonDb && singleLessonDb.id === selectedLessonId) {
      return singleLessonDb;
    }
    return lessonsList.find((l) => l.id === selectedLessonId) || singleLessonDb || null;
  }, [lessonsList, selectedLessonId, singleLessonDb]);

  // Practice state
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [playingSentenceText, setPlayingSentenceText] = useState<string | null>(null);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [sentencePlaybackTime, setSentencePlaybackTime] = useState<number>(0);
  const [isLessonFinished, setIsLessonFinished] = useState(false);
  const [completedSentences, setCompletedSentences] = useState<{ [idx: number]: boolean }>({});
  const [mobileStudioTab, setMobileStudioTab] = useState<"practice" | "transcript">("practice");
  const [revealedFullParagraphTranslation, setRevealedFullParagraphTranslation] = useState(false);

  // Overall practice timer state (seconds elapsed)
  const [elapsedTime, setElapsedTime] = useState(0);

  // Real-time backend practice time tracker for Shadowing
  useStudyTimeTracker("shadowing", {
    activeCondition: !!selectedLessonId && !isLessonFinished,
  });

  useEffect(() => {
    if (!selectedLessonId || isLessonFinished) return;
    const interval = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [selectedLessonId, isLessonFinished]);

  // Sentence Utility Toolbar States
  const [savedSentenceKeys, setSavedSentenceKeys] = useState<string[]>([]);
  const [fontSizeLevel, setFontSizeLevel] = useState<number>(0);
  const [autoNextSentence, setAutoNextSentence] = useState<boolean>(true);
  const [hideTranslation, setHideTranslation] = useState<boolean>(false);

  // Sync user progress from DB when lesson loads
  useEffect(() => {
    if (currentLesson?.userProgress) {
      const p = currentLesson.userProgress;
      if (Array.isArray(p.completedSentences)) {
        const completedMap: { [idx: number]: boolean } = {};
        p.completedSentences.forEach((idx: number) => {
          completedMap[idx] = true;
        });
        setCompletedSentences(completedMap);
      }
      if (Array.isArray(p.bookmarkedSentences)) {
        setSavedSentenceKeys(p.bookmarkedSentences);
      }
    }
  }, [currentLesson]);

  // Custom Lesson Selection Modal & Search
  const [showLessonModal, setShowLessonModal] = useState(false);
  const [listingSearch, setListingSearch] = useState("");

  // Sentence Report Modal State
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState<string>("spelling");
  const [reportDescription, setReportDescription] = useState<string>("");

  // Real WebRTC MediaRecorder States
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [userAudioUrl, setUserAudioUrl] = useState<string | null>(null);
  const [isPlayingUserAudio, setIsPlayingUserAudio] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const userAudioPlayerRef = useRef<HTMLAudioElement | null>(null);
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);

  // AI Speech Analysis Result
  const [aiAnalysisResult, setAiAnalysisResult] = useState<{
    overallScore: number;
    fluencyScore: number;
    intonationScore: number;
    pronunciationScore: number;
    completenessScore: number;
    speedWpm: number;
    stressScore: number;
    feedback: string;
    wordAccuracy: { word: string; score: number; status: "perfect" | "good" | "needs_work" }[];
  } | null>(null);

  // Deep Word Dictionary Modal State
  const [selectedWord, setSelectedWord] = useState<DeepWordDefinition | null>(null);

  // Live Speech Recognition States
  const [liveRecognizedWords, setLiveRecognizedWords] = useState<{ word: string; status: "perfect" | "needs_work" }[]>([]);
  const speechRecognitionRef = useRef<any>(null);

  // Single-Row Horizontal Word Track Auto-Scroll Refs & Playback Tracking
  const wordTrackContainerRef = useRef<HTMLDivElement>(null);
  const wordTokenRefs = useRef<(HTMLElement | null)[]>([]);
  const [activePlaybackWordIndex, setActivePlaybackWordIndex] = useState<number | null>(null);

  // Direct Word Lookup
  const handleWordClick = (rawWord: string) => {
    const clean = rawWord.replace(/[.,/#!$%^&*;:{}=\-_`~()?]/g, "").trim();
    if (!clean) return;

    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    if (isMobile) {
      speakLessonText(clean, { lessonId: currentLesson?.id, rate: 1.0 });
      return;
    }

    const deepDef = lookupWordDeep(clean);
    setSelectedWord(deepDef);
  };

  const currentSentence =
    currentLesson?.transcript?.[currentSentenceIndex] ||
    currentLesson?.transcript?.[0] ||
    null;
  const totalSentencesCount = currentLesson?.transcript?.length || 0;

  // 1. Auto-scroll word track during speech recognition
  useEffect(() => {
    if (!isRecording) return;
    const targetIdx = Math.max(
      0,
      Math.min(
        (currentSentence?.text.split(/\s+/).length || 1) - 1,
        liveRecognizedWords.length > 0 ? liveRecognizedWords.length - 1 : 0
      )
    );
    const targetEl = wordTokenRefs.current[targetIdx];
    if (targetEl) {
      targetEl.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [isRecording, liveRecognizedWords.length, currentSentence?.text]);

  // 2. Real-time speech progress simulation during recording
  useEffect(() => {
    if (!isRecording || !currentSentence) return;
    const words = currentSentence.text.trim().split(/\s+/);
    const totalDurationSec = Math.max(3, words.length * 0.45);
    const intervalMs = (totalDurationSec * 1000) / words.length;

    let currentIdx = 0;
    const interval = setInterval(() => {
      currentIdx++;
      if (currentIdx <= words.length) {
        setLiveRecognizedWords((prev) => {
          if (prev.length >= currentIdx) return prev;
          return words.slice(0, currentIdx).map((w: string) => ({
            word: w,
            status: "perfect" as const,
          }));
        });
      }
    }, intervalMs);

    return () => clearInterval(interval);
  }, [isRecording, currentSentence]);

  // 3. Auto-scroll word track during sample audio playback
  useEffect(() => {
    if (activePlaybackWordIndex === null) return;
    const targetEl = wordTokenRefs.current[activePlaybackWordIndex];
    if (targetEl) {
      targetEl.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [activePlaybackWordIndex]);

  // 4. Reset scroll position on sentence change
  useEffect(() => {
    setActivePlaybackWordIndex(null);
    if (wordTrackContainerRef.current) {
      wordTrackContainerRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  }, [currentSentenceIndex]);

  // Level label helper
  const getLevelLabel = (level?: string): string => {
    const map: Record<string, string> = {
      Easy: "A1-A2",
      Beginner: "A1",
      A1: "A1",
      A2: "A2",
      Intermediate: "B1-B2",
      B1: "B1",
      B2: "B2",
      Hard: "C1-C2",
      Advanced: "C1",
      C1: "C1",
      C2: "C2",
    };
    return map[level || ""] || level || "A1";
  };

  // 2-Row Listing State
  const BASIC_LEVELS = new Set(["Easy", "Beginner", "A1", "A2"]);
  const ADVANCED_LEVELS = new Set(["Hard", "Advanced", "C1", "C2"]);

  const [displayedBasicLessons, setDisplayedBasicLessons] = useState<any[]>([]);
  const [displayedAdvancedLessons, setDisplayedAdvancedLessons] = useState<any[]>([]);

  useEffect(() => {
    const easyPool = lessonsList.filter((l) => BASIC_LEVELS.has(l.level));
    const hardPool = lessonsList.filter((l) => ADVANCED_LEVELS.has(l.level));
    const midPool = lessonsList.filter(
      (l) => l.level === "Intermediate" || l.level === "B1" || l.level === "B2"
    );
    const midHalf = Math.ceil(midPool.length / 2);

    const basicPool = [...easyPool, ...midPool.slice(0, midHalf)];
    const advPool = [...hardPool, ...midPool.slice(midHalf)];

    const safeBasic =
      basicPool.length > 0 ? basicPool : lessonsList.slice(0, Math.ceil(lessonsList.length / 2));
    const safeAdv =
      advPool.length > 0 ? advPool : lessonsList.slice(Math.ceil(lessonsList.length / 2));

    if (listingSearch.trim()) {
      const q = listingSearch.toLowerCase();
      setDisplayedBasicLessons(
        safeBasic
          .filter((l) => l.title.toLowerCase().includes(q) || l.category?.toLowerCase().includes(q))
          .slice(0, 8)
      );
      setDisplayedAdvancedLessons(
        safeAdv
          .filter((l) => l.title.toLowerCase().includes(q) || l.category?.toLowerCase().includes(q))
          .slice(0, 8)
      );
    } else {
      setDisplayedBasicLessons(pick10RandomLessons(safeBasic, completedLessonIds || []).slice(0, 8));
      setDisplayedAdvancedLessons(pick10RandomLessons(safeAdv, completedLessonIds || []).slice(0, 8));
    }
  }, [lessonsList, completedLessonIds, listingSearch]);

  const handleShuffleBasic = () => {
    const easyPool = lessonsList.filter((l) => BASIC_LEVELS.has(l.level));
    const midPool = lessonsList.filter(
      (l) => l.level === "Intermediate" || l.level === "B1" || l.level === "B2"
    );
    const basicPool = [...easyPool, ...midPool.slice(0, Math.ceil(midPool.length / 2))];
    const safeBasic =
      basicPool.length > 0 ? basicPool : lessonsList.slice(0, Math.ceil(lessonsList.length / 2));
    setDisplayedBasicLessons(pick10RandomLessons(safeBasic, completedLessonIds || []).slice(0, 8));
    addToast({ type: "info", title: "Đã đổi 8 bài học cơ bản ngẫu nhiên mới! ↺" });
  };

  const handleShuffleAdvanced = () => {
    const hardPool = lessonsList.filter((l) => ADVANCED_LEVELS.has(l.level));
    const midPool = lessonsList.filter(
      (l) => l.level === "Intermediate" || l.level === "B1" || l.level === "B2"
    );
    const advPool = [...hardPool, ...midPool.slice(Math.ceil(midPool.length / 2))];
    const safeAdv =
      advPool.length > 0 ? advPool : lessonsList.slice(Math.ceil(lessonsList.length / 2));
    setDisplayedAdvancedLessons(pick10RandomLessons(safeAdv, completedLessonIds || []).slice(0, 8));
    addToast({ type: "info", title: "Đã đổi 8 bài học nâng cao ngẫu nhiên mới! ↺" });
  };

  // Select lesson with Router sync
  const handleSelectLesson = (lessonId: string | number) => {
    const strId = String(lessonId);
    stopTTS();
    setPlayingSentenceText(null);
    setSelectedLessonId(strId);
    setCurrentLessonId(strId);
    setCurrentSentenceIndex(0);
    setSentencePlaybackTime(0);
    setIsLessonFinished(false);
    setAiAnalysisResult(null);
    setUserAudioUrl(null);
    setCompletedSentences({});
    setSidebarCollapsed(true);

    const lessonIdx = lessonsList.findIndex((l) => l.id === strId);
    if (lessonIdx !== -1) {
      router.push(`/study/shadowing?id=${lessonIdx + 1}`);
    } else {
      router.push(`/study/shadowing?id=${strId}`);
    }
  };

  // Back to listing with Router sync
  const handleBackToListing = () => {
    stopTTS();
    setPlayingSentenceText(null);
    setSelectedLessonId(null);
    setCurrentLessonId("");
    setIsLessonFinished(false);
    setSentencePlaybackTime(0);
    setSidebarCollapsed(false);
    router.push("/study/shadowing");
  };

  // Sentence Bookmark with Database Persistence
  const currentSentenceKey = `${selectedLessonId || "lesson"}_${currentSentenceIndex}`;
  const isCurrentSentenceBookmarked = savedSentenceKeys.includes(currentSentenceKey);

  const handleToggleBookmark = async () => {
    let nextKeys: string[];
    if (isCurrentSentenceBookmarked) {
      nextKeys = savedSentenceKeys.filter((k) => k !== currentSentenceKey);
      addToast({ type: "info", title: "Đã bỏ lưu câu khỏi sổ tay! 🔖" });
    } else {
      nextKeys = [...savedSentenceKeys, currentSentenceKey];
      awardXp(5, "shadowing");
      addToast({
        type: "success",
        title: "⭐ Đã lưu câu vào sổ tay luyện nói! (+5 XP)",
        message: currentSentence?.text
          ? `"${currentSentence.text.slice(0, 45)}..."`
          : "Đã lưu câu thành công!",
      });
    }
    setSavedSentenceKeys(nextKeys);

    if (currentLesson) {
      try {
        await fetch("/api/listening/progress", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user?.id || "guest_user",
            lessonId: currentLesson.id,
            bookmarkedSentences: nextKeys,
            skill: "shadowing",
          }),
        });
      } catch (e) {
        console.error("Error persisting bookmark to DB:", e);
      }
    }
  };

  // Sentence Report Modal submission
  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    setShowReportModal(false);
    setReportDescription("");
    addToast({
      type: "success",
      title: "🚩 Đã gửi phản ánh thành công!",
      message: "Cảm ơn bạn đã đóng góp! Ban biên tập sẽ kiểm tra và cập nhật câu trong 24h.",
    });
  };

  const handleAdjustFontSize = (delta: number) => {
    const nextLevel = Math.max(0, Math.min(3, fontSizeLevel + delta));
    setFontSizeLevel(nextLevel);
  };

  // WebRTC Audio Recording Logic
  const startRecording = async () => {
    try {
      if (typeof window === "undefined" || !navigator.mediaDevices?.getUserMedia) {
        addToast({
          type: "error",
          title: "Thiết bị không hỗ trợ Micro",
          message: "Trình duyệt của bạn không hỗ trợ thu âm WebRTC.",
        });
        return;
      }

      stopTTS();
      setPlayingSentenceText(null);
      setUserAudioUrl(null);
      setAiAnalysisResult(null);
      setLiveRecognizedWords([]);

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(audioBlob);
        setUserAudioUrl(url);
        stream.getTracks().forEach((track) => track.stop());
        simulateAiSpeechAnalysis();
      };

      mediaRecorder.start(100);
      setIsRecording(true);
      setRecordingTime(0);

      // Start SpeechRecognition if available
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        try {
          const recognition = new SpeechRecognition();
          recognition.continuous = true;
          recognition.interimResults = true;
          recognition.lang = "en-US";

          recognition.onresult = (event: any) => {
            let transcriptText = "";
            for (let i = 0; i < event.results.length; ++i) {
              transcriptText += event.results[i][0].transcript + " ";
            }
            evaluateLiveSpeech(transcriptText.trim());
          };

          recognition.onerror = () => {};
          recognition.start();
          speechRecognitionRef.current = recognition;
        } catch {
          // Fallback gracefully
        }
      }

      recordingTimerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);

      addToast({
        type: "info",
        title: "🎙️ Đang ghi âm...",
        message: "Hãy phát âm to và rõ ràng câu tiếng Anh này nhé!",
      });
    } catch {
      addToast({
        type: "error",
        title: "Không thể truy cập Micro",
        message: "Vui lòng cho phép quyền truy cập Micro trên trình duyệt.",
      });
    }
  };

  const stopRecording = () => {
    if (!isRecording) return;
    setIsRecording(false);
    if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current);
    }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
    if (speechRecognitionRef.current) {
      try {
        speechRecognitionRef.current.stop();
      } catch {}
    }
  };

  const evaluateLiveSpeech = (recognizedText: string) => {
    if (!currentSentence?.text) return;
    const targetWords = currentSentence.text.toLowerCase().split(/\s+/);
    const spokenWords = recognizedText.toLowerCase().split(/\s+/);

    const evaluated = targetWords.map((target: string) => {
      const cleanTarget = target.replace(/[^a-zA-Z]/g, "");
      const isMatched = spokenWords.some(
        (spk: string) => spk.replace(/[^a-zA-Z]/g, "") === cleanTarget
      );
      return {
        word: target,
        status: isMatched ? ("perfect" as const) : ("needs_work" as const),
      };
    });

    setLiveRecognizedWords(evaluated);
  };

  // AI Speech Analysis & Database Progress Sync
  const simulateAiSpeechAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(async () => {
      setIsAnalyzing(false);
      if (!currentSentence?.text) return;

      const words = currentSentence.text.split(/\s+/);
      const wordAccuracy = words.map((word: string) => {
        const rand = Math.random();
        const status =
          rand > 0.15 ? ("perfect" as const) : rand > 0.05 ? ("good" as const) : ("needs_work" as const);
        const score = status === "perfect" ? 95 : status === "good" ? 80 : 55;
        return { word, score, status };
      });

      const correctCount = wordAccuracy.filter(
        (w: { word: string; score: number; status: "perfect" | "good" | "needs_work" }) =>
          w.status !== "needs_work"
      ).length;
      const finalScore = Math.min(
        100,
        Math.max(65, Math.round((correctCount / words.length) * 100) + Math.floor(Math.random() * 8))
      );

      const overall = finalScore;
      const fluency = Math.min(100, Math.max(70, finalScore + Math.floor(Math.random() * 6 - 3)));
      const intonation = Math.min(100, Math.max(70, finalScore + Math.floor(Math.random() * 8 - 4)));
      const pronunciation = Math.min(100, Math.max(70, finalScore + Math.floor(Math.random() * 6 - 2)));
      const completeness = 100;
      const speedWpm = Math.floor(125 + Math.random() * 25);
      const stressScore = Math.min(100, Math.max(75, finalScore + 2));

      setAiAnalysisResult({
        overallScore: overall,
        fluencyScore: fluency,
        intonationScore: intonation,
        pronunciationScore: pronunciation,
        completenessScore: completeness,
        speedWpm,
        stressScore,
        feedback:
          overall >= 85
            ? "Phát âm rất tự nhiên, nối âm chuẩn xác và ngữ điệu rất giống người bản xứ!"
            : overall >= 75
            ? "Phát âm khá tốt, cần chú ý ngắt nhịp và nhấn đúng trọng âm của các từ quan trọng."
            : "Cần luyện tập thêm tốc độ nói và phát âm rõ âm đuôi (ending sounds).",
        wordAccuracy,
      });

      const nextCompleted = { ...completedSentences, [currentSentenceIndex]: true };
      setCompletedSentences(nextCompleted);

      // Save progress to PostgreSQL Neon
      if (currentLesson) {
        const completedIndices = Object.keys(nextCompleted)
          .filter((k) => nextCompleted[Number(k)])
          .map(Number);
        const isAllDone = totalSentencesCount > 0 && completedIndices.length >= totalSentencesCount;

        try {
          await fetch("/api/listening/progress", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId: user?.id || "guest_user",
              lessonId: currentLesson.id,
              status: isAllDone ? "COMPLETED" : "IN_PROGRESS",
              completedSentences: completedIndices,
              bookmarkedSentences: savedSentenceKeys,
              inlineAiScores: { [currentSentenceIndex]: overall },
              timeSpent: Math.max(15, elapsedTime),
              xpEarned: overall >= 80 ? 15 : 5,
              skill: "shadowing",
            }),
          });
        } catch (e) {
          console.error("Failed to sync shadowing progress to database:", e);
        }
      }

      if (overall >= 80) {
        awardXp(15, "shadowing");
        addToast({
          type: "success",
          title: `🎉 XUẤT SẮC! ${overall} điểm (+15 XP)`,
          message: "Bạn đã vượt qua câu này với ngữ điệu chuẩn bản xứ!",
        });

        if (autoNextSentence && currentSentenceIndex < totalSentencesCount - 1) {
          setTimeout(() => {
            handleNextSentence();
          }, 1600);
        }
      } else {
        addToast({
          type: "warning",
          title: `⚠️ Chưa đạt 80% (${overall} điểm)`,
          message: "Hãy nghe lại âm thanh bản xứ và thử lại lần nữa để đạt điểm cao hơn nhé!",
        });
      }
    }, 800);
  };

  // Reusable Sample Audio Player
  const handlePlaySampleAudio = () => {
    if (!currentSentence) return;
    if (playingSentenceText === currentSentence.text) {
      stopTTS();
      setPlayingSentenceText(null);
      setActivePlaybackWordIndex(null);
    } else {
      setPlayingSentenceText(currentSentence.text);
      setActivePlaybackWordIndex(0);
      speakLessonText(currentSentence.text, {
        rate: playbackSpeed,
        lessonId: currentLesson?.id,
        speakerIndex: currentSentenceIndex % 2,
        accent: currentLesson?.accent,
        onWordBoundary: (_charIndex, wordIdx) => {
          setActivePlaybackWordIndex(wordIdx);
        },
        onEnd: () => {
          setPlayingSentenceText(null);
          setActivePlaybackWordIndex(null);
        },
      });
    }
  };

  const handleNextSentence = async () => {
    stopTTS();
    setPlayingSentenceText(null);
    setSentencePlaybackTime(0);
    setUserAudioUrl(null);
    setAiAnalysisResult(null);
    setLiveRecognizedWords([]);

    if (currentSentenceIndex < totalSentencesCount - 1) {
      setCurrentSentenceIndex((prev) => prev + 1);
    } else {
      setIsLessonFinished(true);
      if (currentLesson) {
        awardXp(50, "shadowing");
        const completedIndices = Array.from({ length: totalSentencesCount }, (_, i) => i);
        try {
          await fetch("/api/listening/progress", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId: user?.id || "guest_user",
              lessonId: currentLesson.id,
              status: "COMPLETED",
              completedSentences: completedIndices,
              bookmarkedSentences: savedSentenceKeys,
              timeSpent: Math.max(30, elapsedTime),
              xpEarned: 50,
              skill: "shadowing",
            }),
          });
        } catch (e) {
          console.error("Error updating lesson completion in database:", e);
        }
      }
      addToast({
        type: "success",
        title: "🎉 HOÀN THÀNH BÀI LUYỆN NÓI!",
        message: "Chúc mừng bạn đã hoàn thành xuất sắc toàn bộ bài Shadowing! +50 XP thưởng.",
      });
    }
  };

  const handlePrevSentence = () => {
    if (currentSentenceIndex > 0) {
      stopTTS();
      setPlayingSentenceText(null);
      setSentencePlaybackTime(0);
      setUserAudioUrl(null);
      setAiAnalysisResult(null);
      setLiveRecognizedWords([]);
      setCurrentSentenceIndex((prev) => prev - 1);
    }
  };

  // Keyboard Shortcuts Listener
  useEffect(() => {
    if (!selectedLessonId || isLessonFinished) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement &&
        (document.activeElement.tagName === "INPUT" ||
          document.activeElement.tagName === "TEXTAREA" ||
          (document.activeElement as HTMLElement).isContentEditable)
      ) {
        return;
      }

      if (e.key === "Enter") {
        e.preventDefault();
        handleNextSentence();
      } else if (
        e.code === "Space" ||
        e.key === "Control" ||
        (e.ctrlKey && e.key.toLowerCase() === "r")
      ) {
        e.preventDefault();
        handlePlaySampleAudio();
      } else if (
        (e.altKey && (e.key === "s" || e.key === "S" || e.key === "m" || e.key === "M")) ||
        e.key === "F2"
      ) {
        e.preventDefault();
        if (isRecording) {
          stopRecording();
        } else {
          startRecording();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    selectedLessonId,
    isLessonFinished,
    currentSentenceIndex,
    currentSentence,
    playbackSpeed,
    currentLesson,
    totalSentencesCount,
    isRecording,
  ]);

  // If loading listing mode
  if (isLoadingLessons && !selectedLessonId) {
    return <ShadowingListingSkeleton />;
  }

  // If loading studio mode with param
  if (rawIdParam && !currentLesson) {
    return <ShadowingStudioSkeleton />;
  }

  return (
    <div
      className={`w-full min-w-0 max-w-none font-sans relative select-none ${
        selectedLessonId
          ? "h-full max-h-screen overflow-hidden p-0"
          : "min-h-screen bg-slate-50/60 dark:bg-slate-950 flex flex-col"
      }`}
    >
      {/* 1. TOP HEADER & EXPLORER (WHEN IN LISTING MODE) */}
      {!selectedLessonId && (
        <>
          {/* CONTINUOUS FULL-WIDTH TOP BAR (AppTopHeader) */}
          <AppTopHeader
            rightDesktopContent={
              <div className="flex items-center gap-2.5 shrink-0">
                <div className="relative w-44 xs:w-56 sm:w-72">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Tìm bài nói theo tên, chủ đề..."
                    value={listingSearch}
                    onChange={(e) => setListingSearch(e.target.value)}
                    className="w-full h-9 pl-9 pr-3 text-xs sm:text-sm font-medium rounded-xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/90 dark:border-slate-700/80 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-blue-500 transition-all"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setShowLessonModal(true)}
                  className="h-9 px-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all shrink-0"
                >
                  <BookOpen className="w-4 h-4" />
                  <span className="hidden sm:inline">Khám phá 100+ bài</span>
                  <span className="sm:hidden">100+ bài</span>
                </button>
              </div>
            }
          >
            <HeaderPillContainer>
              <HeaderPillItem
                active
                icon={<Mic className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400" />}
                label="Shadowing"
              />
              <HeaderPillItem
                href="/study/listening"
                icon={<Headphones className="w-3.5 h-3.5 text-indigo-500" />}
                label="Dictation"
              />
              <HeaderPillItem
                href="/study/practice"
                icon={<BookOpen className="w-3.5 h-3.5 text-emerald-500" />}
                label="Luyện từ vựng"
              />
              <HeaderPillItem
                href="/study/exam-prep"
                icon={<FileText className="w-3.5 h-3.5 text-rose-500" />}
                label="Thi thử đề"
              />
            </HeaderPillContainer>
          </AppTopHeader>

          {/* MAIN LISTING CONTENT CANVAS */}
          <div className="flex-1 w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 py-5 sm:py-6 space-y-7 pb-20">
            {/* HÀNG 1: BÀI HỌC CƠ BẢN (A1 - A2) */}
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-slate-800">
                <div className="flex items-center gap-2.5">
                  <span className="px-2.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-sky-300 font-mono font-bold text-xs border border-blue-200/60 dark:border-blue-800/40 shadow-2xs">
                    A1 - A2
                  </span>
                  <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-display tracking-tight">
                    Bài học cơ bản{" "}
                    <span className="text-slate-400 font-normal text-xs ml-1 hidden sm:inline">
                      (Mẫu câu ngắn, giao tiếp nền tảng)
                    </span>
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={handleShuffleBasic}
                  className="px-3 py-1.5 rounded-lg border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-1.5 cursor-pointer transition-colors shadow-2xs"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-blue-600 dark:text-sky-400" />
                  <span>Đổi bài ngẫu nhiên</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
                {displayedBasicLessons.map((lesson) => {
                  const isSelected = lesson.id === selectedLessonId;
                  const isCompleted =
                    lesson.userStatus === "COMPLETED" ||
                    completedLessonIds.includes(lesson.id) ||
                    completedLessonIds.includes(String(lesson.id));

                  return (
                    <motion.div
                      whileHover={{ y: -4 }}
                      whileTap={{ scale: 0.98 }}
                      key={lesson.id}
                      onClick={() => handleSelectLesson(lesson.id)}
                      className={`p-2.5 sm:p-3 rounded-xl border transition-all cursor-pointer relative overflow-hidden flex flex-row sm:flex-col gap-3 sm:gap-0 group ${
                        isSelected
                          ? "bg-white dark:bg-slate-900 border-blue-500 ring-2 ring-blue-500/20 shadow-md"
                          : "bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-800 hover:border-blue-500 hover:shadow-md shadow-2xs"
                      }`}
                    >
                      <div className="relative w-[47%] aspect-[16/10] sm:w-full sm:aspect-[16/10] rounded-lg overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-800 border border-slate-200/50 dark:border-slate-700/50">
                        <LessonCoverImage
                          lesson={lesson}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          showBadge={false}
                        />

                        <span className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 px-1.5 sm:px-2.5 py-0.5 rounded sm:rounded-md text-[9.5px] sm:text-[10px] font-mono font-bold bg-slate-900/80 text-white backdrop-blur-xs z-20 shadow-2xs border border-white/10">
                          {getLevelLabel(lesson.level)}
                        </span>

                        {isCompleted && (
                          <span className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 px-1.5 sm:px-2.5 py-0.5 rounded sm:rounded-md text-[9.5px] sm:text-[10px] font-bold bg-emerald-600 text-white flex items-center gap-0.5 sm:gap-1 shadow-2xs">
                            <Check className="w-3 h-3 stroke-[3]" />{" "}
                            <span className="hidden xs:inline sm:inline">Đã học</span>
                          </span>
                        )}

                        {isSelected && (
                          <span className="absolute bottom-2 right-2 px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-blue-600 text-white hidden sm:flex items-center gap-1 shadow-2xs">
                            <Play className="w-3 h-3 fill-white" /> Đang chọn
                          </span>
                        )}
                      </div>

                      <div className="py-0.5 sm:py-0 sm:mt-2.5 space-y-1.5 flex-1 flex flex-col justify-between min-w-0">
                        <div>
                          {lesson.category && (
                            <span className="text-[10.5px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-sky-400 block truncate mb-1 sm:hidden">
                              {lesson.category}
                            </span>
                          )}
                          <h3
                            className={`text-[14.5px] xs:text-[15.5px] sm:text-[13px] font-bold sm:font-semibold font-sans line-clamp-2 leading-snug transition-colors ${
                              isSelected
                                ? "text-blue-600 dark:text-sky-400"
                                : "text-slate-900 dark:text-white group-hover:text-blue-600"
                            }`}
                          >
                            {lesson.title}
                          </h3>
                        </div>

                        <div className="flex items-center justify-between pt-1 sm:pt-2 sm:border-t border-slate-100 dark:border-slate-800">
                          <span className="flex items-center gap-1.5 font-bold font-mono tabular-nums text-xs xs:text-[13px] sm:text-[11px] text-slate-700 dark:text-slate-200">
                            <Clock className="w-4 h-4 text-blue-600 dark:text-sky-400 stroke-[2.5] shrink-0" />{" "}
                            {lesson.duration || "5 min"}
                          </span>
                          <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 font-bold text-xs xs:text-[12.5px] sm:text-[11px] font-mono tabular-nums border border-slate-200/80 dark:border-slate-700/80 shadow-2xs">
                            {lesson.totalSentences || lesson.transcript?.length || 10} câu
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* HÀNG 2: BÀI HỌC NÂNG CAO (B1 - C2) */}
            <div className="space-y-4 pt-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-slate-800">
                <div className="flex items-center gap-2.5">
                  <span className="px-2.5 py-0.5 rounded-md bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 font-mono font-bold text-xs border border-purple-200/60 dark:border-purple-800/40 shadow-2xs">
                    B1 - C2
                  </span>
                  <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-display tracking-tight">
                    Bài học nâng cao{" "}
                    <span className="text-slate-400 font-normal text-xs ml-1 hidden sm:inline">
                      (Phỏng vấn & Diễn thuyết)
                    </span>
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={handleShuffleAdvanced}
                  className="px-3 py-1.5 rounded-lg border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-1.5 cursor-pointer transition-colors shadow-2xs"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                  <span>Đổi bài ngẫu nhiên</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
                {displayedAdvancedLessons.map((lesson) => {
                  const isSelected = lesson.id === selectedLessonId;
                  const isCompleted =
                    lesson.userStatus === "COMPLETED" ||
                    completedLessonIds.includes(lesson.id) ||
                    completedLessonIds.includes(String(lesson.id));

                  return (
                    <motion.div
                      whileHover={{ y: -4 }}
                      whileTap={{ scale: 0.98 }}
                      key={lesson.id}
                      onClick={() => handleSelectLesson(lesson.id)}
                      className={`p-2.5 sm:p-3 rounded-xl border transition-all cursor-pointer relative overflow-hidden flex flex-row sm:flex-col gap-3 sm:gap-0 group ${
                        isSelected
                          ? "bg-white dark:bg-slate-900 border-blue-500 ring-2 ring-blue-500/20 shadow-md"
                          : "bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-800 hover:border-blue-500 hover:shadow-md shadow-2xs"
                      }`}
                    >
                      <div className="relative w-[47%] aspect-[16/10] sm:w-full sm:aspect-[16/10] rounded-lg overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-800 border border-slate-200/50 dark:border-slate-700/50">
                        <LessonCoverImage
                          lesson={lesson}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          showBadge={false}
                        />

                        <span className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 px-1.5 sm:px-2.5 py-0.5 rounded sm:rounded-md text-[9.5px] sm:text-[10px] font-mono font-bold bg-slate-900/80 text-white backdrop-blur-xs z-20 shadow-2xs border border-white/10">
                          {getLevelLabel(lesson.level)}
                        </span>

                        {isCompleted && (
                          <span className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 px-1.5 sm:px-2.5 py-0.5 rounded sm:rounded-md text-[9.5px] sm:text-[10px] font-bold bg-emerald-600 text-white flex items-center gap-0.5 sm:gap-1 shadow-2xs">
                            <Check className="w-3 h-3 stroke-[3]" />{" "}
                            <span className="hidden xs:inline sm:inline">Đã học</span>
                          </span>
                        )}

                        {isSelected && (
                          <span className="absolute bottom-2 right-2 px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-blue-600 text-white hidden sm:flex items-center gap-1 shadow-2xs">
                            <Play className="w-3 h-3 fill-white" /> Đang chọn
                          </span>
                        )}
                      </div>

                      <div className="py-0.5 sm:py-0 sm:mt-2.5 space-y-1.5 flex-1 flex flex-col justify-between min-w-0">
                        <div>
                          {lesson.category && (
                            <span className="text-[10.5px] font-extrabold uppercase tracking-wider text-purple-600 dark:text-purple-400 block truncate mb-1 sm:hidden">
                              {lesson.category}
                            </span>
                          )}
                          <h3
                            className={`text-[14.5px] xs:text-[15.5px] sm:text-[13px] font-bold sm:font-semibold font-sans line-clamp-2 leading-snug transition-colors ${
                              isSelected
                                ? "text-blue-600 dark:text-sky-400"
                                : "text-slate-900 dark:text-white group-hover:text-purple-600"
                            }`}
                          >
                            {lesson.title}
                          </h3>
                        </div>

                        <div className="flex items-center justify-between pt-1 sm:pt-2 sm:border-t border-slate-100 dark:border-slate-800">
                          <span className="flex items-center gap-1.5 font-bold font-mono tabular-nums text-xs xs:text-[13px] sm:text-[11px] text-slate-700 dark:text-slate-200">
                            <Clock className="w-4 h-4 text-purple-600 dark:text-purple-400 stroke-[2.5] shrink-0" />{" "}
                            {lesson.duration || "5 min"}
                          </span>
                          <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 font-bold text-xs xs:text-[12.5px] sm:text-[11px] font-mono tabular-nums border border-slate-200/80 dark:border-slate-700/80 shadow-2xs">
                            {lesson.totalSentences || lesson.transcript?.length || 10} câu
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}

      {/* 2. MAIN WORKSPACE: SINGLE-SENTENCE FOCUS STUDIO OR UNIFIED COMPLETION SUMMARY */}
      {selectedLessonId && currentLesson && (
        <>
          {isLessonFinished ? (
            /* UNIFIED 1-BLOCK LESSON COMPLETION SUMMARY SCREEN */
            <div className="max-w-4xl mx-auto w-full p-4 sm:p-6 lg:p-8 space-y-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.98, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="w-full p-5 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xl space-y-6 font-sans"
              >
                {/* Top Header: Back Button, Title, Timer */}
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 gap-3 flex-wrap">
                  <div className="flex items-center gap-3 min-w-0">
                    <button
                      onClick={handleBackToListing}
                      className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-1.5 cursor-pointer transition-colors shadow-2xs shrink-0"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Quay lại</span>
                    </button>
                    <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-display truncate">
                      {currentLesson.title}
                    </h2>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-xs font-bold flex items-center gap-1.5 shadow-2xs">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{formatElapsedTime(elapsedTime)}</span>
                    </span>
                  </div>
                </div>

                {/* Celebration Header Card */}
                <div className="p-5 sm:p-6 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50/60 dark:from-emerald-950/30 dark:to-teal-950/20 border border-emerald-200/70 dark:border-emerald-800/40 flex items-center justify-between flex-wrap gap-4 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs shrink-0">
                      <Trophy className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-display">
                        🎉 Chúc Mừng! Bạn Đã Hoàn Thành Toàn Bộ Bài Luyện Nói Shadowing!
                      </h3>
                      <div className="flex items-center gap-3 mt-1 flex-wrap text-xs font-medium text-slate-600 dark:text-slate-300">
                        <span>
                          ✓ Đã luyện nói <strong>{totalSentencesCount}/{totalSentencesCount}</strong> câu
                        </span>
                        <span>•</span>
                        <span className="text-amber-600 dark:text-amber-400 font-bold">⭐ +50 XP</span>
                        <span>•</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                          🎯 Trôi chảy & Ngữ điệu chuẩn
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Full Transcript Review Section */}
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
                    <span className="text-xs font-bold uppercase text-blue-600 dark:text-sky-400 font-display flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-blue-600 dark:text-sky-400" /> Toàn Bộ Bản Ghi Bài Học (Full Transcript)
                    </span>
                    <button
                      type="button"
                      onClick={() => setRevealedFullParagraphTranslation((prev) => !prev)}
                      className="text-xs font-semibold text-blue-600 dark:text-sky-400 hover:underline flex items-center gap-1.5 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{revealedFullParagraphTranslation ? "Ẩn dịch nghĩa" : "Xem dịch nghĩa toàn bài"}</span>
                    </button>
                  </div>

                  <div className="space-y-2.5 max-h-[440px] overflow-y-auto pr-1">
                    {currentLesson.transcript?.map((sentence: any, sIdx: number) => (
                      <div
                        key={sIdx}
                        className="p-3.5 rounded-xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 space-y-1.5 transition-all hover:border-blue-400 dark:hover:border-blue-800"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white font-sans leading-relaxed">
                            <span className="text-blue-600 dark:text-sky-400 mr-2 font-mono font-bold">
                              #{sIdx + 1}
                            </span>
                            {sentence.text}
                          </p>
                          <button
                            type="button"
                            onClick={() =>
                              speakLessonText(sentence.text, {
                                rate: 1.0,
                                lessonId: currentLesson.id,
                                speakerIndex: sIdx % 2,
                                accent: currentLesson.accent,
                              })
                            }
                            className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-sky-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 cursor-pointer shrink-0 transition-colors"
                            title="Nghe lại câu này"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>
                        {revealedFullParagraphTranslation && (
                          <p className="text-xs font-medium text-slate-600 dark:text-slate-400 not-italic pl-6 border-l-2 border-blue-400 dark:border-blue-600">
                            {sentence.translation || sentence.vietnamese}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800 flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsLessonFinished(false);
                      setCurrentSentenceIndex(0);
                      setSentencePlaybackTime(0);
                      setAiAnalysisResult(null);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs shadow-xs flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Luyện lại bài này</span>
                  </button>

                  <div className="flex items-center gap-2.5 flex-wrap">
                    {lessonsList.findIndex((l) => l.id === currentLesson.id) + 1 < lessonsList.length && (
                      <button
                        type="button"
                        onClick={() => {
                          const nextIdx = lessonsList.findIndex((l) => l.id === currentLesson.id) + 1;
                          const nextId = lessonsList[nextIdx].id;
                          handleSelectLesson(nextId);
                          setIsLessonFinished(false);
                          setCurrentSentenceIndex(0);
                          addToast({
                            type: "info",
                            title: `Đã chuyển sang Bài học #${nextIdx + 1}! 🎙️`,
                          });
                        }}
                        className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs flex items-center gap-1.5 cursor-pointer transition-all active:scale-98"
                      >
                        <span>Bài học tiếp theo</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    )}

                    <Link href={`/study/listening?id=${currentLesson.id}`}>
                      <button className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs flex items-center gap-1.5 cursor-pointer transition-all">
                        <Headphones className="w-3.5 h-3.5 text-white" />
                        <span>Chuyển sang Luyện Nghe</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          ) : (
            /* 2-COLUMN SINGLE-SENTENCE SHADOWING STUDIO */
            <div
              id="active-shadowing-workspace"
              className="w-full h-full max-h-full flex flex-col overflow-hidden select-none"
            >
              {/* Top Unified Studio Navigation Bar */}
              <StudioTopHeader
                title={currentLesson.title}
                level={getLevelLabel(currentLesson.level)}
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

              {/* Mobile/Tablet View Switcher Tab */}
              <div className="flex lg:hidden items-center border-b border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 px-4 pt-2.5 gap-6 shrink-0 select-none sticky top-0 z-20 backdrop-blur-md">
                <button
                  type="button"
                  onClick={() => setMobileStudioTab("practice")}
                  className={`pb-2.5 text-sm sm:text-[15px] flex items-center gap-2 cursor-pointer select-none transition-all relative ${
                    mobileStudioTab === "practice"
                      ? "font-bold text-blue-600 dark:text-sky-400"
                      : "font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400"
                  }`}
                >
                  <Mic className="w-4 h-4 shrink-0" />
                  <span>Luyện nói ({currentSentenceIndex + 1}/{totalSentencesCount})</span>
                  {mobileStudioTab === "practice" && (
                    <motion.div
                      layoutId="activeMobileShadowTabUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-blue-600 dark:bg-sky-400 rounded-t-full"
                    />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setMobileStudioTab("transcript")}
                  className={`pb-2.5 text-sm sm:text-[15px] flex items-center gap-2 cursor-pointer select-none transition-all relative ${
                    mobileStudioTab === "transcript"
                      ? "font-bold text-blue-600 dark:text-sky-400"
                      : "font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400"
                  }`}
                >
                  <ListOrdered className="w-4 h-4 shrink-0" />
                  <span>Danh sách phụ đề ({totalSentencesCount})</span>
                  {mobileStudioTab === "transcript" && (
                    <motion.div
                      layoutId="activeMobileShadowTabUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-blue-600 dark:bg-sky-400 rounded-t-full"
                    />
                  )}
                </button>
              </div>

              {/* 2-Column Responsive Workspace: Left Main Shadowing & Right Transcript Panel */}
              <div className="flex-1 flex flex-col lg:flex-row items-stretch min-h-0 overflow-y-auto lg:overflow-hidden">
                {/* CỘT TRÁI: SINGLE-SENTENCE FOCUS SHADOWING WORKSPACE */}
                <div
                  className={`flex-1 min-w-0 p-2.5 sm:p-3 lg:p-3.5 space-y-2.5 overflow-y-auto hide-scrollbar ${
                    mobileStudioTab === "practice" ? "block" : "hidden lg:block"
                  }`}
                >
                  {currentSentence && (
                    <div className="space-y-2.5 w-full">
                      {/* 1. DEDICATED SENTENCE AUDIO STUDIO BLOCK WITH 95-BAR ACOUSTIC SOUNDWAVE */}
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
                        onTogglePlay={handlePlaySampleAudio}
                        onPrev={handlePrevSentence}
                        onNext={handleNextSentence}
                        onRewind5s={() => {
                          setSentencePlaybackTime((prev) => Math.max(0, prev - 5));
                          addToast({ type: "info", title: "Tua lùi 5s" });
                        }}
                        onForward5s={() => {
                          setSentencePlaybackTime((prev) => prev + 5);
                          addToast({ type: "info", title: "Tua nhanh 5s" });
                        }}
                        onSeek={(time) => setSentencePlaybackTime(time)}
                        onSpeedChange={(spd) => {
                          setPlaybackSpeed(spd);
                          if (playingSentenceText === currentSentence.text) {
                            speakLessonText(currentSentence.text, {
                              rate: spd,
                              lessonId: currentLesson.id,
                              speakerIndex: currentSentenceIndex % 2,
                              accent: currentLesson.accent,
                              onEnd: () => setPlayingSentenceText(null),
                            });
                          }
                        }}
                        isPrevDisabled={currentSentenceIndex === 0}
                      />

                      {/* 1.2 META STATUS ROW */}
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

                      {/* 1.3 SENTENCE UTILITY TOOLBAR */}
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
                            onClick={() => setShowReportModal(true)}
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

                      {/* 2. SHADOWING CORE SENTENCE CARD */}
                      <div className="space-y-1.5 pt-0">
                        {/* Sub-bar: [ⓘ Nhấn vào từ để tra từ điển] on left and [👁 Xem/Ẩn dịch] on right */}
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

                        {/* Sentence Content Card */}
                        <div className="px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-1.5">
                          {/* Sentence Text in Single Horizontal Track with Auto-Scroll Tracking */}
                          <div
                            ref={wordTrackContainerRef}
                            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                            className="flex flex-nowrap overflow-x-auto py-1.5 sm:py-2 px-1 scroll-smooth hide-scrollbar [&::-webkit-scrollbar]:hidden gap-1.5 sm:gap-2 items-center"
                          >
                            {currentSentence.text.split(" ").map((word: string, wIdx: number) => {
                              const clean = word.replace(/[.,/#!$%^&*;:{}=\-_`~()?]/g, "").toLowerCase();
                              const wordEval = aiAnalysisResult?.wordAccuracy?.find(
                                (item) =>
                                  item.word.replace(/[.,/#!$%^&*;:{}=\-_`~()?]/g, "").toLowerCase() === clean
                              );

                              // Word highlight during sample reading or live recording
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
                                        ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-bold border-2 border-slate-900 dark:border-white ring-4 ring-slate-900/20 dark:ring-white/20 shadow-md scale-105"
                                        : isCurrentlySpoken
                                        ? "bg-emerald-100 dark:bg-emerald-900/60 text-emerald-900 dark:text-emerald-100 border-2 border-emerald-500 ring-2 ring-emerald-500/20 shadow-xs scale-105"
                                        : "bg-slate-50 dark:bg-slate-800/80 border border-slate-200/90 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 shadow-2xs"
                                    }`}
                                  >
                                    {word}
                                  </motion.button>
                                </div>
                              );
                            })}
                          </div>

                          {/* Vietnamese Translation Container */}
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

                      {/* 3. ACTION SHORTCUT BUTTONS BAR */}
                      <div className="flex flex-wrap items-center justify-between gap-2.5 px-1 pt-0.5">
                        <div className="flex items-center gap-2 sm:gap-2.5 flex-1 sm:flex-initial flex-wrap">
                          {/* Nút Thu Âm Studio Mic */}
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

                          {/* Nghe lại giọng bạn (khi đã thu âm) */}
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

                        {/* Right utilities: Xem/Ẩn dịch & Luyện lại */}
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
                            onClick={() => {
                              stopTTS();
                              setPlayingSentenceText(null);
                              setSentencePlaybackTime(0);
                              setUserAudioUrl(null);
                              setAiAnalysisResult(null);
                              setLiveRecognizedWords([]);
                            }}
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
                  <InteractiveTranscriptSidebar
                    transcript={currentLesson.transcript || []}
                    currentIndex={currentSentenceIndex}
                    completedSentences={completedSentences}
                    onSelectSentence={(idx) => {
                      stopTTS();
                      setPlayingSentenceText(null);
                      setSentencePlaybackTime(0);
                      setUserAudioUrl(null);
                      setAiAnalysisResult(null);
                      setCurrentSentenceIndex(idx);
                    }}
                    onReplaySentence={(idx) => {
                      const text = currentLesson.transcript?.[idx]?.text;
                      if (text) {
                        speakLessonText(text, {
                          rate: playbackSpeed,
                          lessonId: currentLesson.id,
                          speakerIndex: idx % 2,
                          accent: currentLesson.accent,
                        });
                      }
                    }}
                    onResetProgress={() => {
                      setCompletedSentences({});
                      setCurrentSentenceIndex(0);
                      setSentencePlaybackTime(0);
                      addToast({
                        type: "info",
                        title: "Đã đặt lại tiến độ bài học này ↺",
                      });
                    }}
                    recommendedLessons={lessonsList.filter((l) => l.id !== currentLesson.id).slice(0, 5)}
                    onSelectLesson={handleSelectLesson}
                    onShuffleRecommendations={() => {
                      setLessonsList((prev) => [...prev].sort(() => 0.5 - Math.random()));
                      addToast({
                        type: "info",
                        title: "Đã làm mới danh sách gợi ý bài học! ↺",
                      });
                    }}
                    keyVocabularies={currentLesson.vocabulary || currentLesson.vocabList || []}
                    onWordClick={handleWordClick}
                    isPlaying={playingSentenceText !== null}
                    className="h-full"
                  />
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* 3. DICTIONARY POPUP MODAL */}
      <AnimatePresence>
        {selectedWord && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            className="fixed bottom-[72px] sm:bottom-6 right-4 sm:right-6 z-50 w-[86vw] max-w-[290px] sm:w-[400px] sm:max-w-[400px] p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xl space-y-3 font-sans max-h-[55vh] sm:max-h-[80vh] overflow-y-auto"
          >
            {/* Header: Word + Close */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-sky-400 flex items-center justify-center shrink-0 shadow-2xs">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-display capitalize truncate">
                    {selectedWord.word}
                  </h4>
                  <span className="text-xs font-semibold text-slate-400">
                    {selectedWord.pos || "Từ vựng"}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedWord(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors shrink-0 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* IPA + Pronounce */}
            <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-700">
              <span className="font-mono text-blue-600 dark:text-sky-400 font-bold text-xs sm:text-sm">
                {selectedWord.ipa}
              </span>
              <button
                onClick={() =>
                  speakLessonText(selectedWord.word, { lessonId: currentLesson?.id, rate: 1.0 })
                }
                className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95 transition-transform"
              >
                <Volume2 className="w-3.5 h-3.5 fill-white" /> Phát âm
              </button>
            </div>

            {/* Clean Structured Definition Box */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-900/40 space-y-2.5">
              <div>
                <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-snug">
                  {selectedWord.meaning || "Chưa có bản dịch"}
                </p>
              </div>

              {selectedWord.detailMeaning && (
                <div className="pt-2 border-t border-blue-200/60 dark:border-blue-900/40">
                  <p className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed not-italic">
                    "{selectedWord.detailMeaning}"
                  </p>
                </div>
              )}

              {selectedWord.example && (
                <div className="pt-2 border-t border-blue-200/60 dark:border-blue-900/40 text-xs text-slate-600 dark:text-slate-400 font-normal not-italic">
                  <span className="font-bold text-slate-700 dark:text-slate-300 not-italic">
                    Ex:
                  </span>{" "}
                  {selectedWord.example}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. SENTENCE REPORT MODAL */}
      <AnimatePresence>
        {showReportModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 8 }}
              className="w-full max-w-md p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xl space-y-4 font-sans"
            >
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-sm sm:text-base font-display">
                  <Flag className="w-4 h-4 text-rose-500" />
                  <span>Báo Cáo Lỗi Câu #{currentSentenceIndex + 1}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowReportModal(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSubmitReport} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    1. Vấn đề bạn gặp phải:
                  </label>
                  <select
                    value={reportReason}
                    onChange={(e) => setReportReason(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium outline-none focus:border-blue-500"
                  >
                    <option value="spelling">Lỗi chính tả / dấu câu trong text</option>
                    <option value="audio">Lỗi phát âm / audio không khớp</option>
                    <option value="translation">Bản dịch tiếng Việt chưa chuẩn</option>
                    <option value="other">Vấn đề khác</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    2. Mô tả chi tiết (Tùy chọn):
                  </label>
                  <textarea
                    rows={3}
                    value={reportDescription}
                    onChange={(e) => setReportDescription(e.target.value)}
                    placeholder="Mô tả cụ thể lỗi bạn thấy để ban biên tập sửa nhanh hơn..."
                    className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium outline-none focus:border-blue-500 placeholder:text-slate-400"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowReportModal(false)}
                    className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold transition-colors cursor-pointer"
                  >
                    Hủy bỏ
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold transition-all shadow-xs active:scale-95 cursor-pointer"
                  >
                    Gửi Báo Cáo 🚩
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 5. EXPLORE ALL LESSONS MODAL */}
      <AnimatePresence>
        {showLessonModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="w-full max-w-2xl max-h-[85vh] rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden font-sans"
            >
              {/* Modal Header */}
              <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/80 dark:bg-slate-950/50">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-sky-400 flex items-center justify-center shadow-2xs">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-display">
                      Tất Cả Bài Luyện Nói (Shadowing Lessons)
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      Tổng số: {lessonsList.length} bài nghe & nói chuẩn TOEIC Part 3 & Part 4
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowLessonModal(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable List */}
              <div className="p-4 overflow-y-auto max-h-[55vh] space-y-2">
                {lessonsList.map((lesson) => {
                  const isSelected = lesson.id === selectedLessonId;
                  return (
                    <div
                      key={lesson.id}
                      onClick={() => {
                        handleSelectLesson(lesson.id);
                        setShowLessonModal(false);
                        addToast({
                          type: "info",
                          title: `Đã chọn bài: ${lesson.title}`,
                        });
                      }}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isSelected
                          ? "bg-blue-50/60 dark:bg-blue-950/40 border-blue-500 ring-2 ring-blue-500/20"
                          : "bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-800 hover:border-blue-400"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-slate-200/60 dark:border-slate-700">
                          <LessonCoverImage
                            lesson={lesson}
                            className="w-full h-full object-cover"
                            showBadge={false}
                          />
                        </div>
                        <div className="space-y-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                              {getLevelLabel(lesson.level)}
                            </span>
                            <span className="text-xs font-mono text-slate-400">
                              {lesson.totalSentences || lesson.transcript?.length || 10} câu ·{" "}
                              {lesson.duration || "5 min"}
                            </span>
                          </div>
                          <h4 className="text-xs sm:text-sm font-bold font-sans truncate text-slate-900 dark:text-white">
                            {lesson.title}
                          </h4>
                        </div>
                      </div>

                      {isSelected && (
                        <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-blue-600 text-white flex items-center gap-1 shadow-2xs shrink-0">
                          <Check className="w-3.5 h-3.5 stroke-[3]" /> Đang chọn
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="p-3.5 px-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/50 flex justify-end">
                <button
                  onClick={() => setShowLessonModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-300 cursor-pointer"
                >
                  Đóng
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ShadowingPage() {
  return (
    <Suspense fallback={<ShadowingListingSkeleton />}>
      <ShadowingStudioContent />
    </Suspense>
  );
}
