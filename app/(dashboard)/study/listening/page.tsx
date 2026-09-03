"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, Button, Badge } from "@/shared/components/ui";
import { useAuthStore } from "@/stores/authStore";
import { useUserStore } from "@/stores/userStore";
import { useNotificationStore } from "@/stores/notificationStore";
import { useListeningStore } from "@/stores/listeningStore";
import { useUiStore } from "@/stores/uiStore";
import { motion, AnimatePresence } from "framer-motion";
import { speakLessonText, stopTTS } from "@/shared/utils/ttsEngine";
import { LessonCoverImage } from "@/shared/components/feedback/LessonCoverImage";
import { DictationWorkspace } from "@/features/listening/components/DictationWorkspace";
import { StudioTopHeader } from "@/features/listening/components/StudioTopHeader";
import { StudioWaveformCard } from "@/features/listening/components/StudioWaveformCard";
import { InteractiveTranscriptSidebar, formatLevelBadge } from "@/features/listening/components/InteractiveTranscriptSidebar";
import { ListeningListingSkeleton, ListeningStudioSkeleton, ShimmerBox } from "@/features/listening/components/LoadingSkeletons";
import {
  AppTopHeader,
  HeaderPillContainer,
  HeaderPillItem,
} from "@/shared/components/layout/AppTopHeader";
import { useStudyTimeTracker } from "@/shared/hooks/useStudyTimeTracker";
import {
  Headphones,
  Play,
  Pause,
  FastForward,
  Rewind,
  RotateCcw,
  RotateCw,
  SkipBack,
  SkipForward,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  XCircle,
  Volume2,
  Trophy,
  Mic,
  Eye,
  EyeOff,
  BookOpen,
  ChevronRight,
  Sparkles,
  BookMarked,
  Check,
  RefreshCw,
  FileText,
  Plus,
  Clock,
  Brain,
  PenLine,
  GraduationCap,
  BookmarkPlus,
  Flag,
  Info,
  X,
  ListOrdered,
  Search,
  Layers,
  Target,
  Zap,
  Keyboard,
} from "lucide-react";
import { MOCK_LESSONS_DATA } from "@/features/listening/data/listeningMockData";
import { lookupWordDeep, DeepWordDefinition } from "@/features/vocabulary/data/deepDictionary";
import { pick10RandomLessons } from "@/features/listening/utils/randomLessonPicker";

// Curated 44-bar acoustic waveform profile for realistic speech audio visualization
const SPEECH_WAVE_AMPLITUDES = [
  12, 16, 24, 38, 56, 74, 92, 80, 58, 42, 65, 88, 98, 86, 68, 48, 64, 84, 96, 78,
  55, 40, 62, 85, 95, 82, 60, 46, 70, 90, 84, 62, 45, 66, 82, 68, 50, 36, 28, 22,
  16, 14, 12, 10,
];

// Helper to resolve query id (e.g. ?id=1 -> 1st lesson or listen_001)
const resolveLessonId = (
  queryId: string | null | undefined,
  list: any[],
): string | null => {
  if (!queryId || !list || list.length === 0) return null;

  // 1. Direct match by lesson id
  const exact = list.find((l) => l.id === queryId);
  if (exact) return exact.id;

  // 2. Numeric match (e.g. ?id=1 -> 1st lesson or listen_001)
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

// Generate initial character avatar and gradient
const getInitialAvatar = (title: string) => {
  const firstChar = title ? title.charAt(0).toUpperCase() : "E";
  const gradients = [
    "from-blue-600 to-indigo-600",
    "from-purple-600 to-pink-600",
    "from-emerald-600 to-teal-600",
    "from-amber-500 to-orange-600",
    "from-rose-600 to-red-600",
    "from-cyan-600 to-blue-600",
  ];
  const charCode = firstChar.charCodeAt(0);
  const gradient = gradients[charCode % gradients.length];
  return { firstChar, gradient };
};

function ListeningPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawIdParam = searchParams.get("id") || searchParams.get("lessonId");

  const { user, awardXp } = useAuthStore();
  const { addToast } = useNotificationStore();
  const {
    currentLessonId,
    setCurrentLessonId,
    markLessonCompleted,
    completedLessonIds,
  } = useListeningStore();
  const { setSidebarCollapsed, setHideBottomNav } = useUiStore();

  // Lessons list state (combines DB lessons + fallback)
  const [lessonsList, setLessonsList] = useState<any[]>([]);
  const [isLoadingLessons, setIsLoadingLessons] = useState(true);

  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(() => {
    if (!rawIdParam) return null;
    return resolveLessonId(rawIdParam, MOCK_LESSONS_DATA);
  });

  const currentLesson =
    lessonsList.find((l) => l.id === selectedLessonId) || null;

  // Single-sentence focus states
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [playingSentenceText, setPlayingSentenceText] = useState<string | null>(null);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [sentencePlaybackTime, setSentencePlaybackTime] = useState<number>(0);
  const [isLessonFinished, setIsLessonFinished] = useState(false);
  const [completedSentences, setCompletedSentences] = useState<{
    [idx: number]: boolean;
  }>({});
  const [revealedFullParagraphTranslation, setRevealedFullParagraphTranslation] =
    useState(false);
  const [mobileStudioTab, setMobileStudioTab] = useState<"dictation" | "transcript">("dictation");

  const currentSentence =
    currentLesson?.transcript?.[currentSentenceIndex] ||
    (currentLesson?.transcript && currentLesson.transcript.length > 0
      ? currentLesson.transcript[0]
      : null);

  const totalSentencesCount = currentLesson?.transcript?.length || 0;

  // Overall practice timer state (seconds elapsed)
  const [elapsedTime, setElapsedTime] = useState(0);
  const elapsedTimeRef = useRef(0);

  // Sentence Utility Toolbar States (matching user screenshot)
  const [savedSentenceKeys, setSavedSentenceKeys] = useState<string[]>([]);
  const [cloudNoteText, setCloudNoteText] = useState("");

  const [fontSizeLevel, setFontSizeLevel] = useState<number>(() => {
    if (typeof window === "undefined") return 0;
    try {
      const raw = localStorage.getItem("xp_listening_font_size");
      return raw ? parseInt(raw, 10) : 0;
    } catch {
      return 0;
    }
  });

  const [autoNextSentence, setAutoNextSentence] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    try {
      const raw = localStorage.getItem("xp_listening_auto_next");
      return raw !== null ? JSON.parse(raw) : true;
    } catch {
      return true;
    }
  });

  const [hideTranslation, setHideTranslation] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    try {
      const raw = localStorage.getItem("xp_listening_hide_trans");
      return raw !== null ? JSON.parse(raw) : false;
    } catch {
      return false;
    }
  });

  const [currentAccent, setCurrentAccent] = useState<string>("en-US");
  const [currentVolume, setCurrentVolume] = useState<number>(() => {
    if (typeof window === "undefined") return 1.0;
    try {
      const saved = localStorage.getItem("xp_listening_volume");
      return saved ? parseFloat(saved) : 1.0;
    } catch {
      return 1.0;
    }
  });

  useEffect(() => {
    if (currentLesson?.accent) {
      setCurrentAccent(currentLesson.accent);
    }
  }, [currentLesson?.accent]);

  // 1. Fetch Lessons Catalog from PostgreSQL Neon Database
  useEffect(() => {
    let isMounted = true;
    const fetchLessons = async () => {
      try {
        setIsLoadingLessons(true);
        const res = await fetch(`/api/listening/lessons?userId=${user?.id || ""}`);
        const json = await res.json();
        if (isMounted && json.success && Array.isArray(json.data) && json.data.length > 0) {
          setLessonsList(json.data);
        } else if (isMounted) {
          setLessonsList(MOCK_LESSONS_DATA);
        }
      } catch (err) {
        console.error("Error fetching listening lessons from DB:", err);
        if (isMounted) setLessonsList(MOCK_LESSONS_DATA);
      } finally {
        if (isMounted) setIsLoadingLessons(false);
      }
    };
    fetchLessons();
    return () => {
      isMounted = false;
    };
  }, [user?.id]);

  const [isLoadingLessonDetail, setIsLoadingLessonDetail] = useState(false);
  const [isSyncingDb, setIsSyncingDb] = useState(false);
  const [isShufflingBasic, setIsShufflingBasic] = useState(false);
  const [isShufflingAdvanced, setIsShufflingAdvanced] = useState(false);
  const [isShufflingRecommendations, setIsShufflingRecommendations] = useState(false);

  // 2. Fetch Single Lesson Details & User Progress from Database
  useEffect(() => {
    if (!selectedLessonId) return;
    let isMounted = true;
    const fetchLessonDetail = async () => {
      try {
        setIsLoadingLessonDetail(true);
        const res = await fetch(
          `/api/listening/lessons/${selectedLessonId}?userId=${user?.id || ""}`
        );
        const json = await res.json();
        if (isMounted && json.success && json.data) {
          const detail = json.data;
          // Hydrate into lessons list if missing
          setLessonsList((prev) => {
            if (prev.some((l) => l.id === detail.id)) return prev;
            return [detail, ...prev];
          });
          // Hydrate user progress
          if (detail.userProgress) {
            const prog = detail.userProgress;
            if (Array.isArray(prog.completedSentences)) {
              const compMap: { [idx: number]: boolean } = {};
              prog.completedSentences.forEach((idx: number) => {
                compMap[idx] = true;
              });
              setCompletedSentences(compMap);
            }
            if (Array.isArray(prog.bookmarkedSentences)) {
              setSavedSentenceKeys(prog.bookmarkedSentences);
            }
            if (prog.timeSpent && prog.timeSpent > 0) {
              setElapsedTime(prog.timeSpent);
            }
            if (prog.status === "COMPLETED") {
              setIsLessonFinished(true);
            }
          }
          if (detail.userNote !== undefined) {
            setCloudNoteText(detail.userNote || "");
          }
        }
      } catch (err) {
        console.error("Error fetching lesson detail:", err);
      } finally {
        if (isMounted) setIsLoadingLessonDetail(false);
      }
    };
    fetchLessonDetail();
    return () => {
      isMounted = false;
    };
  }, [selectedLessonId, user?.id]);

  // Current sentence bookmark key
  const currentSentenceKey = `${selectedLessonId || "lesson"}_${currentSentenceIndex}`;
  const isCurrentSentenceBookmarked = savedSentenceKeys.includes(currentSentenceKey);

  const handleToggleBookmark = async () => {
    let nextKeys: string[];
    if (isCurrentSentenceBookmarked) {
      nextKeys = savedSentenceKeys.filter((k) => k !== currentSentenceKey);
      addToast({ type: "info", title: "Đã bỏ lưu câu khỏi sổ tay! 🔖" });
    } else {
      nextKeys = [...savedSentenceKeys, currentSentenceKey];
      awardXp(5, "dictation");
      addToast({
        type: "success",
        title: "⭐ Đã lưu câu vào sổ tay luyện tập! (+5 XP)",
        message: currentSentence?.text
          ? `"${currentSentence.text.slice(0, 45)}..."`
          : "Đã lưu câu thành công!",
      });
    }
    setSavedSentenceKeys(nextKeys);

    if (currentLesson) {
      setIsSyncingDb(true);
      try {
        await fetch("/api/listening/progress", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user?.id || "guest_user",
            lessonId: currentLesson.id,
            bookmarkedSentences: nextKeys,
          }),
        });
      } catch (e) {
        console.error("Error persisting bookmark to DB:", e);
      } finally {
        setIsSyncingDb(false);
      }
    }
  };

  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState<string>("spelling");
  const [reportDescription, setReportDescription] = useState<string>("");

  const handleReportSentence = () => {
    setShowReportModal(true);
  };

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    setShowReportModal(false);
    setReportDescription("");
    addToast({
      type: "success",
      title: "🚩 Đã gửi phản ánh thành công!",
      message:
        "Cảm ơn bạn đã đóng góp! Ban biên tập sẽ kiểm tra và cập nhật câu trong 24h.",
    });
  };

  const handleAdjustFontSize = (delta: number) => {
    const nextLevel = Math.max(0, Math.min(3, fontSizeLevel + delta));
    setFontSizeLevel(nextLevel);
    if (typeof window !== "undefined") {
      localStorage.setItem("xp_listening_font_size", String(nextLevel));
    }
    const labels = [
      "Tiêu chuẩn (14px)",
      "Vừa (16px)",
      "Lớn (18px)",
      "Rất lớn (20px)",
    ];
    addToast({ type: "info", title: `Cỡ chữ: ${labels[nextLevel]}` });
  };

  const handleToggleAutoNext = () => {
    const next = !autoNextSentence;
    setAutoNextSentence(next);
    if (typeof window !== "undefined") {
      localStorage.setItem("xp_listening_auto_next", JSON.stringify(next));
    }
    addToast({
      type: "info",
      title: next
        ? "Bật: Tự động chuyển câu"
        : "Tắt: Không tự động chuyển câu",
    });
  };

  const handleToggleHideTranslation = () => {
    const next = !hideTranslation;
    setHideTranslation(next);
    if (typeof window !== "undefined") {
      localStorage.setItem("xp_listening_hide_trans", JSON.stringify(next));
    }
    addToast({
      type: "info",
      title: next
        ? "Đã bật Ẩn dịch (Tập trung luyện nghe)"
        : "Đã tắt Ẩn dịch",
    });
  };

  useEffect(() => {
    elapsedTimeRef.current = elapsedTime;
  }, [elapsedTime]);

  // Real-time backend practice time tracker for Dictation / Listening
  useStudyTimeTracker("dictation", {
    activeCondition: !!selectedLessonId,
  });

  // Timer: Runs continuously during practice
  useEffect(() => {
    if (!selectedLessonId) return;

    const timer = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [selectedLessonId]);

  // Sentence Audio Timer: Counts up ONLY when audio is actively playing with duration clamping
  useEffect(() => {
    if (!playingSentenceText || !currentSentence?.text) return;

    const sentenceDuration = Math.max(
      3,
      Math.ceil(currentSentence.text.trim().split(/\s+/).length / (2.2 * playbackSpeed))
    );

    const timer = setInterval(() => {
      setSentencePlaybackTime((prev) => {
        if (prev >= sentenceDuration) {
          return sentenceDuration;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [playingSentenceText, currentSentence?.text, playbackSpeed]);

  // Helper to format seconds to mm:ss
  const formatElapsedTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  // Sync URL & Auto collapse sidebar
  useEffect(() => {
    if (rawIdParam) {
      const resolved = resolveLessonId(rawIdParam, lessonsList);
      if (resolved) {
        setSelectedLessonId(resolved);
        setCurrentLessonId(resolved);
        setSidebarCollapsed(true);
      }
    }
  }, [rawIdParam, lessonsList, setCurrentLessonId, setSidebarCollapsed]);

  // Automatically ensure sidebar is collapsed when in listening studio workspace
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

  const [listingSearch, setListingSearch] = useState("");

  // Level display label mapping (actual data → user-friendly badge text)
  const getLevelLabel = (level?: string, forceBasic?: boolean): string => {
    if (forceBasic) {
      if (level === "Beginner" || level === "A1") return "A1";
      return "A2";
    }
    const map: Record<string, string> = {
      "Easy": "A1-A2", "Beginner": "A1", "A1": "A1", "A2": "A2",
      "Intermediate": "B1-B2", "B1": "B1", "B2": "B2",
      "Hard": "C1-C2", "Advanced": "C1", "C1": "C1", "C2": "C2",
    };
    return map[level || ""] || level || "B1";
  };

  // Dual Row Picker State: Row 1 Basic & Row 2 Advanced
  const BASIC_LEVELS = new Set(["Easy", "Beginner", "A1", "A2"]);
  const ADVANCED_LEVELS = new Set(["Hard", "Advanced", "C1", "C2"]);

  const [displayedBasicLessons, setDisplayedBasicLessons] = useState<any[]>([]);
  const [displayedAdvancedLessons, setDisplayedAdvancedLessons] = useState<any[]>([]);

  useEffect(() => {
    // Split: Easy → Basic, Hard → Advanced, Intermediate → split evenly
    const easyPool = lessonsList.filter((l) => BASIC_LEVELS.has(l.level));
    const hardPool = lessonsList.filter((l) => ADVANCED_LEVELS.has(l.level));
    const midPool = lessonsList.filter((l) => l.level === "Intermediate" || l.level === "B1" || l.level === "B2");
    const midHalf = Math.ceil(midPool.length / 2);

    const basicPool = [...easyPool, ...midPool.slice(0, midHalf)];
    const advPool = [...hardPool, ...midPool.slice(midHalf)];

    const safeBasic = basicPool.length > 0 ? basicPool : lessonsList.slice(0, Math.ceil(lessonsList.length / 2));
    const safeAdv = advPool.length > 0 ? advPool : lessonsList.slice(Math.ceil(lessonsList.length / 2));

    if (listingSearch.trim()) {
      const q = listingSearch.toLowerCase();
      setDisplayedBasicLessons(
        safeBasic.filter((l) => l.title.toLowerCase().includes(q) || l.category?.toLowerCase().includes(q)).slice(0, 8)
      );
      setDisplayedAdvancedLessons(
        safeAdv.filter((l) => l.title.toLowerCase().includes(q) || l.category?.toLowerCase().includes(q)).slice(0, 8)
      );
    } else {
      setDisplayedBasicLessons(pick10RandomLessons(safeBasic, completedLessonIds || []).slice(0, 8));
      setDisplayedAdvancedLessons(pick10RandomLessons(safeAdv, completedLessonIds || []).slice(0, 8));
    }
  }, [lessonsList, completedLessonIds, listingSearch]);

  const handleShuffleBasic = () => {
    setIsShufflingBasic(true);
    setTimeout(() => {
      const easyPool = lessonsList.filter((l) => BASIC_LEVELS.has(l.level));
      const midPool = lessonsList.filter((l) => l.level === "Intermediate" || l.level === "B1" || l.level === "B2");
      const basicPool = [...easyPool, ...midPool.slice(0, Math.ceil(midPool.length / 2))];
      const safeBasic = basicPool.length > 0 ? basicPool : lessonsList.slice(0, Math.ceil(lessonsList.length / 2));
      setDisplayedBasicLessons(pick10RandomLessons(safeBasic, completedLessonIds || []).slice(0, 8));
      setIsShufflingBasic(false);
      addToast({ type: "info", title: "Đã đổi 8 bài cơ bản ngẫu nhiên mới!" });
    }, 180);
  };

  const handleShuffleAdvanced = () => {
    setIsShufflingAdvanced(true);
    setTimeout(() => {
      const hardPool = lessonsList.filter((l) => ADVANCED_LEVELS.has(l.level));
      const midPool = lessonsList.filter((l) => l.level === "Intermediate" || l.level === "B1" || l.level === "B2");
      const advPool = [...hardPool, ...midPool.slice(Math.ceil(midPool.length / 2))];
      const safeAdv = advPool.length > 0 ? advPool : lessonsList.slice(Math.ceil(lessonsList.length / 2));
      setDisplayedAdvancedLessons(pick10RandomLessons(safeAdv, completedLessonIds || []).slice(0, 8));
      setIsShufflingAdvanced(false);
      addToast({ type: "info", title: "Đã đổi 8 bài nâng cao ngẫu nhiên mới!" });
    }, 180);
  };

  // Select lesson handler
  const handleSelectLesson = (lessonId: string) => {
    stopTTS();
    setPlayingSentenceText(null);
    setSelectedLessonId(lessonId);
    setCurrentLessonId(lessonId);
    setIsLessonFinished(false);
    setCurrentSentenceIndex(0);
    setSentencePlaybackTime(0);
    setSidebarCollapsed(true);
    localStorage.setItem("xp_voca_last_listening_lesson", lessonId);

    const lessonIdx = lessonsList.findIndex((l) => l.id === lessonId);
    if (lessonIdx !== -1) {
      router.push(`/study/listening?id=${lessonIdx + 1}`);
    } else {
      router.push(`/study/listening?id=${lessonId}`);
    }
  };

  // Back to listing handler
  const handleBackToListing = () => {
    stopTTS();
    setPlayingSentenceText(null);
    setSelectedLessonId(null);
    setCurrentLessonId("");
    setIsLessonFinished(false);
    setCurrentSentenceIndex(0);
    setSentencePlaybackTime(0);
    setSidebarCollapsed(false);
    localStorage.removeItem("xp_voca_last_listening_lesson");
    router.push("/study/listening");
  };

  // Form State: Create New Article
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [createModeTab, setCreateModeTab] = useState<"text" | "youtube">("text");
  const [newTitle, setNewTitle] = useState("");
  const [newText, setNewText] = useState("");
  const [newThumbnail, setNewThumbnail] = useState("");
  const [newAccent, setNewAccent] = useState("en-US");
  const [newLevel, setNewLevel] = useState("B1");
  const [isCreatingLesson, setIsCreatingLesson] = useState(false);
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [isExtractingYoutube, setIsExtractingYoutube] = useState(false);

  const extractYoutubeId = (url: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const handleExtractYoutubeSubtitles = async () => {
    const videoId = extractYoutubeId(youtubeUrl);
    if (!videoId) {
      addToast({
        type: "warning",
        title: "Link YouTube không hợp lệ",
        message: "Vui lòng nhập đường dẫn video YouTube hợp lệ (VD: https://www.youtube.com/watch?v=...)",
      });
      return;
    }

    try {
      setIsExtractingYoutube(true);
      addToast({
        type: "info",
        title: "Đang bóc tách phụ đề từ YouTube...",
      });

      const res = await fetch(`/api/youtube/captions?videoId=${videoId}`);
      const json = await res.json();

      if (json.hasCaptions && Array.isArray(json.subtitles) && json.subtitles.length > 0) {
        const sentences = json.subtitles
          .map((sub: any, idx: number) => ({
            id: idx + 1,
            text: sub.english || sub.text || "",
            translation: sub.vietnamese || "Chưa có bản dịch song ngữ",
            startTime: sub.startSeconds || idx * 5,
            endTime: (sub.startSeconds || idx * 5) + (sub.duration || 5),
          }))
          .filter((s: any) => s.text.trim().length > 0);

        if (sentences.length === 0) {
          throw new Error("Không trích xuất được phụ đề văn bản");
        }

        const autoTitle = newTitle.trim() || `YouTube Dictation: ${videoId}`;
        const autoThumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

        const createRes = await fetch("/api/listening/lessons", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: autoTitle,
            category: "YouTube Dictation",
            level: newLevel,
            accent: newAccent,
            duration: `${Math.max(1, Math.ceil(sentences.length * 0.3))} min`,
            imageUrl: newThumbnail.trim() || autoThumbnail,
            transcript: sentences,
          }),
        });

        const createJson = await createRes.json();
        if (createJson.success && createJson.data) {
          setLessonsList((prev) => [createJson.data, ...prev]);
          setShowCreateForm(false);
          setYoutubeUrl("");
          setNewTitle("");
          handleSelectLesson(createJson.data.id);
          awardXp(20, "dictation");
          addToast({
            type: "success",
            title: "🎉 Đã tạo bài Dictation từ YouTube thành công! (+20 XP)",
            message: `Đã bóc tách thành công ${sentences.length} câu phụ đề.`,
          });
        } else {
          throw new Error(createJson.error || "Không thể lưu bài học");
        }
      } else {
        addToast({
          type: "warning",
          title: "Không tìm thấy phụ đề",
          message: "Video này không có phụ đề tiếng Anh có sẵn. Vui lòng chọn video khác có CC tiếng Anh.",
        });
      }
    } catch (err: any) {
      console.error("Error extracting YouTube captions:", err);
      addToast({
        type: "error",
        title: "Lỗi trích xuất YouTube",
        message: err.message || "Không thể tải phụ đề lúc này. Vui lòng thử lại.",
      });
    } finally {
      setIsExtractingYoutube(false);
    }
  };

  const handleCreateArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (createModeTab === "youtube") {
      await handleExtractYoutubeSubtitles();
      return;
    }
    if (!newTitle.trim() || !newText.trim() || isCreatingLesson) {
      addToast({
        type: "warning",
        title: "Vui lòng nhập đầy đủ tiêu đề và nội dung đoạn văn!",
      });
      return;
    }

    setIsCreatingLesson(true);
    const sentences = newText
      .split(/(?<=[.?!])\s+/)
      .filter((s) => s.trim().length > 0)
      .map((s, idx) => ({
        id: idx + 1,
        text: s.trim(),
        translation: "Đoạn văn được tạo bởi AI (Chưa có bản dịch song ngữ)",
        startTime: idx * 5,
        endTime: (idx + 1) * 5,
      }));

    try {
      const res = await fetch("/api/listening/lessons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newTitle.trim(),
          category: "Bài học của bạn (Custom AI)",
          level: newLevel,
          accent: newAccent,
          duration: `${Math.max(1, Math.ceil(sentences.length * 0.4))} min`,
          imageUrl: newThumbnail.trim() || undefined,
          transcript: sentences,
        }),
      });

      const json = await res.json();
      if (json.success && json.data) {
        const createdLesson = json.data;
        setLessonsList((prev) => [createdLesson, ...prev]);
        setShowCreateForm(false);
        setNewTitle("");
        setNewText("");
        setNewThumbnail("");

        handleSelectLesson(createdLesson.id);
        awardXp(15, "dictation");
        addToast({
          type: "success",
          title: "🎉 Đã tạo bài nghe và lưu vào CSDL! (+15 XP)",
        });
      } else {
        addToast({
          type: "error",
          title: "Lỗi",
          message: json.error || "Không thể tạo bài nghe lúc này.",
        });
      }
    } catch (err) {
      console.error("Error creating custom lesson:", err);
      addToast({
        type: "error",
        title: "Lỗi mạng",
        message: "Không thể kết nối máy chủ để lưu bài nghe.",
      });
    } finally {
      setIsCreatingLesson(false);
    }
  };

  // Right sidebar tab state
  const [rightSidebarTab, setRightSidebarTab] = useState<
    "quiz" | "vocab" | "notes"
  >("quiz");
  const [quizAnswers, setQuizAnswers] = useState<{ [qIdx: number]: number }>({});

  const handleSelectQuizOption = (
    qIdx: number,
    optionIdx: number,
    correctIdx: number,
  ) => {
    if (quizAnswers[qIdx] !== undefined) return;
    const nextAnswers = { ...quizAnswers, [qIdx]: optionIdx };
    setQuizAnswers(nextAnswers);

    const isCorrect = optionIdx === correctIdx;
    if (isCorrect) {
      awardXp(10, "dictation");
      addToast({ type: "success", title: "Chính xác! +10 XP 🎯" });
    } else {
      addToast({
        type: "error",
        title: "Chưa chính xác, hãy đọc kỹ giải thích!",
      });
    }

    if (currentLesson) {
      fetch("/api/listening/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user?.id || "guest_user",
          lessonId: currentLesson.id,
          xpEarned: isCorrect ? 10 : 0,
        }),
      });
    }
  };

  const resetQuiz = () => {
    setQuizAnswers({});
    addToast({ type: "info", title: "Đã làm mới bài kiểm tra Quiz! 🔄" });
  };

  const saveUserNote = async (val: string) => {
    setCloudNoteText(val);
    if (currentLesson) {
      try {
        await fetch("/api/listening/notes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user?.id || "guest_user",
            lessonId: currentLesson.id,
            content: val,
          }),
        });
      } catch (e) {
        console.error("Error saving note to DB:", e);
      }
    }
  };

  // Deep Dictionary Modal State
  const [selectedWord, setSelectedWord] = useState<DeepWordDefinition | null>(null);

  const handleWordClick = (word: string) => {
    const cleanWord = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "").trim();
    if (!cleanWord) return;

    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    if (isMobile) {
      speakLessonText(cleanWord, { lessonId: currentLesson?.id, rate: 1.0 });
      return;
    }

    const deepDef = lookupWordDeep(cleanWord);
    setSelectedWord(deepDef);
  };

  const vocabList =
    currentLesson?.vocabulary || currentLesson?.vocabularyList || [];

  // Space key to toggle play/pause & Arrow keys / shortcuts to navigate sentence audio
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      const isTyping = tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT";

      const sentenceDuration = Math.max(
        3,
        Math.ceil(
          ((currentLesson?.transcript?.[currentSentenceIndex]?.text || "").trim().split(/\s+/).length) /
            (2.2 * playbackSpeed)
        )
      );

      if (e.code === "Space" && !isTyping) {
        e.preventDefault();
        if (playingSentenceText) {
          stopTTS();
          setPlayingSentenceText(null);
        } else {
          const sentence = currentLesson?.transcript?.[currentSentenceIndex];
          if (sentence?.text) {
            setPlayingSentenceText(sentence.text);
            speakLessonText(sentence.text, {
              rate: playbackSpeed,
              lessonId: currentLesson.id,
              speakerIndex: currentSentenceIndex % 2,
              accent: currentAccent || currentLesson.accent,
              volume: currentVolume,
              onEnd: () => {
                setPlayingSentenceText(null);
                setSentencePlaybackTime(0);
              },
            });
          }
        }
      } else if ((e.key === "Control" || (e.ctrlKey && e.code === "KeyR")) && !isTyping) {
        e.preventDefault();
        stopTTS();
        setSentencePlaybackTime(0);
        const sentence = currentLesson?.transcript?.[currentSentenceIndex];
        if (sentence?.text) {
          setPlayingSentenceText(sentence.text);
          speakLessonText(sentence.text, {
            rate: playbackSpeed,
            lessonId: currentLesson.id,
            speakerIndex: currentSentenceIndex % 2,
            accent: currentAccent || currentLesson.accent,
            volume: currentVolume,
            onEnd: () => {
              setPlayingSentenceText(null);
              setSentencePlaybackTime(0);
            },
          });
          addToast({ type: "info", title: "Nghe lại câu hiện tại (Ctrl)" });
        }
      } else if (e.code === "Enter" && !isTyping) {
        e.preventDefault();
        if (currentSentenceIndex < totalSentencesCount - 1) {
          stopTTS();
          setPlayingSentenceText(null);
          setSentencePlaybackTime(0);
          setCurrentSentenceIndex((prev) => prev + 1);
        }
      } else if (e.code === "ArrowLeft" && !isTyping) {
        e.preventDefault();
        setSentencePlaybackTime((prev) => Math.max(0, prev - 5));
        addToast({ type: "info", title: "Tua lùi 5s" });
      } else if (e.code === "ArrowRight" && !isTyping) {
        e.preventDefault();
        setSentencePlaybackTime((prev) => Math.min(sentenceDuration, prev + 5));
        addToast({ type: "info", title: "Tua nhanh 5s" });
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentLesson, currentSentenceIndex, playingSentenceText, playbackSpeed, totalSentencesCount, addToast]);

  if (selectedLessonId && !currentLesson) {
    return <ListeningStudioSkeleton />;
  }

  if (isLoadingLessons && !selectedLessonId) {
    return <ListeningListingSkeleton />;
  }

  return (
    <div
      className={`w-full min-w-0 max-w-none font-sans ${
        selectedLessonId
          ? "h-full max-h-screen overflow-hidden p-0"
          : "min-h-screen bg-slate-50/60 dark:bg-slate-950 flex flex-col"
      }`}
    >
      {/* 1. TOP HEADER & EXPLORER (WHEN IN LISTING MODE) */}
      {!selectedLessonId && (
        <>
          {/* 1.1 CONTINUOUS FULL-WIDTH TOP BAR (AppTopHeader) */}
          <AppTopHeader
            rightDesktopContent={
              <div className="flex items-center gap-2.5 shrink-0">
                <div className="relative w-44 xs:w-56 sm:w-72">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm bài nghe..."
                    value={listingSearch}
                    onChange={(e) => setListingSearch(e.target.value)}
                    className="w-full h-9 pl-9 pr-3 text-xs sm:text-sm font-medium rounded-xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/90 dark:border-slate-700/80 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-blue-500 transition-all"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setShowCreateForm((prev) => !prev)}
                  className="h-9 px-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all shrink-0"
                >
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                  <span className="hidden sm:inline">{showCreateForm ? "Đóng tạo bài" : "Tạo bài AI"}</span>
                  <span className="sm:hidden">{showCreateForm ? "Đóng" : "Tạo bài"}</span>
                </button>
              </div>
            }
          >
            <HeaderPillContainer>
              <HeaderPillItem
                active
                icon={<Headphones className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400" />}
                label="Dictation"
              />
              <HeaderPillItem
                href="/study/shadowing"
                icon={<Mic className="w-3.5 h-3.5 text-sky-500" />}
                label="Shadowing"
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

          {/* 1.2 MAIN LISTING CONTENT CANVAS */}
          <div className="flex-1 w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 py-5 sm:py-6 space-y-7 pb-20">
            {/* FORM TẠO BÀI NGHE AI (ACCORDION) */}
            <AnimatePresence>
              {showCreateForm && (
                <motion.form
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  onSubmit={handleCreateArticle}
                  className="p-4 sm:p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-3.5 overflow-hidden"
                >
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setCreateModeTab("text")}
                        className={`text-xs font-bold uppercase font-display flex items-center gap-1.5 pb-1 border-b-2 transition-all cursor-pointer ${
                          createModeTab === "text"
                            ? "border-blue-600 text-blue-600 dark:text-sky-400"
                            : "border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                        }`}
                      >
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Tạo từ văn bản AI
                      </button>
                      <button
                        type="button"
                        onClick={() => setCreateModeTab("youtube")}
                        className={`text-xs font-bold uppercase font-display flex items-center gap-1.5 pb-1 border-b-2 transition-all cursor-pointer ${
                          createModeTab === "youtube"
                            ? "border-rose-600 text-rose-600 dark:text-rose-400"
                            : "border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                        }`}
                      >
                        <span className="w-2 h-2 rounded-full bg-rose-500" /> Nhập từ YouTube Subtitles
                      </button>
                    </div>
                    <span className="text-xs font-medium text-slate-400 hidden sm:inline">
                      {createModeTab === "text" ? "Tự động tách câu và sinh audio AI" : "Bóc tách phụ đề CC có sẵn từ link YouTube"}
                    </span>
                  </div>

                  {createModeTab === "youtube" ? (
                    <div className="space-y-3.5 py-1">
                      <div className="space-y-1">
                        <label
                          htmlFor="youtube-url-input"
                          className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5"
                        >
                          <span className="text-rose-600">▶</span> Đường dẫn Video YouTube (YouTube Video URL):
                        </label>
                        <input
                          id="youtube-url-input"
                          type="url"
                          required
                          className="w-full h-10 px-3.5 text-xs font-medium rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 transition-all"
                          placeholder="https://www.youtube.com/watch?v=... hoặc https://youtu.be/..."
                          value={youtubeUrl}
                          onChange={(e) => setYoutubeUrl(e.target.value)}
                        />
                        <p className="text-[11px] text-slate-500">
                          Hệ thống sẽ tự động bóc tách toàn bộ phụ đề tiếng Anh và chia thành từng câu Dictation kèm thời gian chuẩn.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                        <div className="space-y-1">
                          <label
                            htmlFor="youtube-custom-title-input"
                            className="text-xs font-bold text-slate-700 dark:text-slate-300"
                          >
                            Tiêu đề bài học (Tùy chọn):
                          </label>
                          <input
                            id="youtube-custom-title-input"
                            type="text"
                            className="w-full h-10 px-3.5 text-xs font-medium rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-rose-500 transition-all"
                            placeholder="Để trống để dùng tiêu đề tự động..."
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                          />
                        </div>

                        <div className="space-y-1">
                          <label
                            htmlFor="youtube-level-select"
                            className="text-xs font-bold text-slate-700 dark:text-slate-300"
                          >
                            Độ khó bài học:
                          </label>
                          <select
                            id="youtube-level-select"
                            value={newLevel}
                            onChange={(e) => setNewLevel(e.target.value)}
                            className="w-full h-10 px-3 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                          >
                            <option value="A1">Level A1 (Cơ bản)</option>
                            <option value="A2">Level A2 (Sơ cấp)</option>
                            <option value="B1">Level B1 (Trung cấp)</option>
                            <option value="B2">Level B2 (Trung cấp khá)</option>
                            <option value="C1">Level C1 (Nâng cao)</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 pt-1">
                        {isExtractingYoutube && (
                          <div className="p-3 rounded-xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 space-y-2 select-none">
                            <div className="flex items-center justify-between text-xs font-semibold text-rose-700 dark:text-rose-300">
                              <span className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                                Đang bóc tách phụ đề & mốc thời gian YouTube...
                              </span>
                              <span className="font-mono text-[11px] font-bold">3 Bước CSDL</span>
                            </div>
                            <div className="w-full h-1.5 rounded-full bg-rose-200 dark:bg-rose-900 overflow-hidden relative">
                              <div className="absolute inset-0 bg-gradient-to-r from-rose-500 via-amber-400 to-rose-600 animate-[shimmer_1.5s_infinite]" />
                            </div>
                            <div className="flex justify-between text-[10.5px] font-medium text-slate-500 dark:text-slate-400 pt-0.5">
                              <span>1. Kết nối YouTube CC</span>
                              <span>2. Phân tách câu & thời gian</span>
                              <span>3. Lưu vào Neon DB</span>
                            </div>
                          </div>
                        )}

                        <div className="flex justify-end">
                          <Button
                            variant="primary"
                            type="submit"
                            disabled={isExtractingYoutube}
                            className="h-9 px-5 text-xs font-bold rounded-lg bg-rose-600 hover:bg-rose-700 text-white shadow-xs active:scale-95 transition-transform cursor-pointer"
                          >
                            {isExtractingYoutube ? "⏳ ĐANG BÓC TÁCH PHỤ ĐỀ..." : "🚀 BÓC TÁCH & TẠO BÀI DICTATION YOUTUBE"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                        <div className="space-y-1">
                          <label
                            htmlFor="new-article-title-input"
                            className="text-xs font-bold text-slate-700 dark:text-slate-300"
                          >
                            1. Tiêu đề bài đọc (Title):
                          </label>
                          <input
                            id="new-article-title-input"
                            type="text"
                            required
                            className="w-full h-10 px-3.5 text-xs font-medium rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                            placeholder="VD: Daily Morning Routine in London..."
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                          />
                        </div>

                        <div className="space-y-1">
                          <label
                            htmlFor="new-article-thumbnail-input"
                            className="text-xs font-bold text-slate-700 dark:text-slate-300"
                          >
                            2. Link ảnh Thumbnail (Không bắt buộc):
                          </label>
                          <input
                            id="new-article-thumbnail-input"
                            type="url"
                            className="w-full h-10 px-3.5 text-xs font-medium rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                            placeholder="https://images.unsplash.com/..."
                            value={newThumbnail}
                            onChange={(e) => setNewThumbnail(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label
                          htmlFor="new-article-text-textarea"
                          className="text-xs font-bold text-slate-700 dark:text-slate-300"
                        >
                          3. Nội dung văn bản đoạn văn (English Text Content):
                        </label>
                        <textarea
                          id="new-article-text-textarea"
                          rows={3}
                          required
                          className="w-full p-3.5 text-xs font-medium rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                          placeholder="Today is a beautiful day. I really love learning English with AI..."
                          value={newText}
                          onChange={(e) => setNewText(e.target.value)}
                        />
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <select
                            aria-label="Chọn Accent"
                            value={newAccent}
                            onChange={(e) => setNewAccent(e.target.value)}
                            className="h-8 px-3 text-xs font-semibold rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                          >
                            <option value="en-US">US Accent</option>
                            <option value="en-UK">UK Accent</option>
                            <option value="en-AU">AU Accent</option>
                          </select>

                          <select
                            aria-label="Chọn Trình độ Level"
                            value={newLevel}
                            onChange={(e) => setNewLevel(e.target.value)}
                            className="h-8 px-3 text-xs font-semibold rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                          >
                            <option value="A1">Level A1</option>
                            <option value="A2">Level A2</option>
                            <option value="B1">Level B1</option>
                            <option value="B2">Level B2</option>
                            <option value="C1">Level C1</option>
                          </select>
                        </div>

                        <Button
                          variant="primary"
                          type="submit"
                          disabled={isCreatingLesson}
                          className="h-9 px-5 text-xs font-bold rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-xs active:scale-95 transition-transform cursor-pointer"
                        >
                          {isCreatingLesson ? "⏳ Đang tạo..." : "🚀 TẠO BÀI NGHE AI NGAY"}
                        </Button>
                      </div>
                    </>
                  )}
                </motion.form>
              )}
            </AnimatePresence>

            {/* HÀNG 1: BÀI HỌC CƠ BẢN (A1 - A2) */}
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-slate-800">
                <div className="flex items-center gap-2.5">
                  <span className="px-2.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-sky-300 font-mono font-bold text-xs border border-blue-200/60 dark:border-blue-800/40 shadow-2xs">
                    A1 - A2
                  </span>
                  <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-display tracking-tight">
                    Bài học cơ bản <span className="text-slate-400 font-normal text-xs ml-1 hidden sm:inline">(Mẫu câu ngắn, giao tiếp nền tảng)</span>
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
                {isShufflingBasic ? (
                  Array.from({ length: 8 }, (_, i) => (
                    <div
                      key={i}
                      className="p-3 sm:p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex flex-row sm:flex-col gap-3 sm:gap-0 select-none"
                    >
                      <div className="relative w-[47%] aspect-[16/10] sm:w-full sm:aspect-[16/10] rounded-xl overflow-hidden shrink-0">
                        <ShimmerBox className="w-full h-full rounded-xl" />
                      </div>
                      <div className="py-0.5 sm:py-0 sm:mt-3 space-y-2 flex-1 flex flex-col justify-between min-w-0">
                        <div className="space-y-1.5">
                          <ShimmerBox className="h-4 w-full rounded" />
                          <ShimmerBox className="h-4 w-4/5 rounded" />
                        </div>
                        <div className="flex items-center justify-between pt-1 sm:pt-2 sm:border-t border-slate-100 dark:border-slate-800">
                          <ShimmerBox className="h-3.5 w-16 rounded" />
                          <ShimmerBox className="h-5 w-14 rounded-lg" />
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  displayedBasicLessons.map((lesson) => {
                  const isSelected = lesson.id === selectedLessonId;
                  const isCompleted = completedLessonIds.includes(lesson.id);

                  return (
                    <motion.div
                      whileHover={{ y: -4 }}
                      whileTap={{ scale: 0.98 }}
                      key={lesson.id}
                      onClick={() => handleSelectLesson(lesson.id)}
                      className={`p-3 sm:p-3.5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden flex flex-row sm:flex-col gap-3 sm:gap-0 group ${
                        isSelected
                          ? "bg-white dark:bg-slate-900 border-[#0059bb] ring-2 ring-[#0059bb]/20 shadow-md"
                          : "bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-800 hover:border-[#0059bb]/70 hover:shadow-md shadow-2xs"
                      }`}
                    >
                      <div className="relative w-[47%] aspect-[16/10] sm:w-full sm:aspect-[16/10] rounded-xl overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-800 border border-slate-200/50 dark:border-slate-700/50">
                        <LessonCoverImage lesson={lesson} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" showBadge={false} />

                        <span className="absolute bottom-2 left-2 px-2 sm:px-2.5 py-0.5 rounded-md text-[9.5px] sm:text-[10px] font-mono font-bold bg-slate-900/85 text-white backdrop-blur-xs z-20 shadow-2xs border border-white/15">
                          {formatLevelBadge(lesson.level)}
                        </span>

                        {isCompleted && (
                          <span className="absolute top-2 right-2 px-2 sm:px-2.5 py-0.5 rounded-md text-[9.5px] sm:text-[10px] font-bold bg-emerald-600/90 text-white flex items-center gap-0.5 sm:gap-1 shadow-2xs backdrop-blur-xs z-20 border border-emerald-400/20">
                            <Check className="w-3 h-3 stroke-[3]" /> <span className="hidden xs:inline sm:inline">Đã học</span>
                          </span>
                        )}

                        {isSelected && (
                          <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-[#0059bb] text-white hidden sm:flex items-center gap-1 shadow-2xs z-20">
                            <Play className="w-3 h-3 fill-white" /> Đang chọn
                          </span>
                        )}
                      </div>

                      <div className="py-0.5 sm:py-0 sm:mt-3 space-y-1.5 flex-1 flex flex-col justify-between min-w-0">
                        <div>
                          {lesson.category && (
                            <span className="text-[10.5px] font-extrabold uppercase tracking-wider text-[#0059bb] dark:text-sky-400 block truncate mb-1 sm:hidden">
                              {lesson.category}
                            </span>
                          )}
                          <h3
                            className={`text-[14.5px] xs:text-[15.5px] sm:text-[13px] font-bold sm:font-semibold font-sans line-clamp-2 leading-snug transition-colors ${
                              isSelected
                                ? "text-[#0059bb] dark:text-sky-400"
                                : "text-slate-900 dark:text-white group-hover:text-[#0059bb] dark:group-hover:text-sky-400"
                            }`}
                          >
                            {lesson.title}
                          </h3>
                        </div>

                        <div className="flex items-center justify-between pt-1 sm:pt-2 sm:border-t border-slate-100 dark:border-slate-800">
                          <span className="flex items-center gap-1.5 font-bold font-mono tabular-nums text-xs xs:text-[13px] sm:text-[11px] text-slate-700 dark:text-slate-200">
                            <Clock className="w-4 h-4 text-[#0059bb] dark:text-sky-400 stroke-[2.5] shrink-0" />{" "}
                            {lesson.duration || "5 min"}
                          </span>
                          <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 font-bold text-xs xs:text-[12.5px] sm:text-[11px] font-mono tabular-nums border border-slate-200/80 dark:border-slate-700/80 shadow-2xs">
                            {lesson.transcript?.length || 10} câu
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
                )}
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
                    Bài học nâng cao <span className="text-slate-400 font-normal text-xs ml-1 hidden sm:inline">(Học thuật, Phỏng vấn & TED Talk)</span>
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
                {isShufflingAdvanced ? (
                  Array.from({ length: 8 }, (_, i) => (
                    <div
                      key={i}
                      className="p-3 sm:p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex flex-row sm:flex-col gap-3 sm:gap-0 select-none"
                    >
                      <div className="relative w-[47%] aspect-[16/10] sm:w-full sm:aspect-[16/10] rounded-xl overflow-hidden shrink-0">
                        <ShimmerBox className="w-full h-full rounded-xl" />
                      </div>
                      <div className="py-0.5 sm:py-0 sm:mt-3 space-y-2 flex-1 flex flex-col justify-between min-w-0">
                        <div className="space-y-1.5">
                          <ShimmerBox className="h-4 w-full rounded" />
                          <ShimmerBox className="h-4 w-4/5 rounded" />
                        </div>
                        <div className="flex items-center justify-between pt-1 sm:pt-2 sm:border-t border-slate-100 dark:border-slate-800">
                          <ShimmerBox className="h-3.5 w-16 rounded" />
                          <ShimmerBox className="h-5 w-14 rounded-lg" />
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  displayedAdvancedLessons.map((lesson) => {
                  const isSelected = lesson.id === selectedLessonId;
                  const isCompleted = completedLessonIds.includes(lesson.id);

                  return (
                    <motion.div
                      whileHover={{ y: -4 }}
                      whileTap={{ scale: 0.98 }}
                      key={lesson.id}
                      onClick={() => handleSelectLesson(lesson.id)}
                      className={`p-3 sm:p-3.5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden flex flex-row sm:flex-col gap-3 sm:gap-0 group ${
                        isSelected
                          ? "bg-white dark:bg-slate-900 border-purple-500 ring-2 ring-purple-500/20 shadow-md"
                          : "bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-800 hover:border-purple-500/70 hover:shadow-md shadow-2xs"
                      }`}
                    >
                      <div className="relative w-[47%] aspect-[16/10] sm:w-full sm:aspect-[16/10] rounded-xl overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-800 border border-slate-200/50 dark:border-slate-700/50">
                        <LessonCoverImage lesson={lesson} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" showBadge={false} />

                        <span className="absolute bottom-2 left-2 px-2 sm:px-2.5 py-0.5 rounded-md text-[9.5px] sm:text-[10px] font-mono font-bold bg-slate-900/85 text-white backdrop-blur-xs z-20 shadow-2xs border border-white/15">
                          {formatLevelBadge(lesson.level)}
                        </span>

                        {isCompleted && (
                          <span className="absolute top-2 right-2 px-2 sm:px-2.5 py-0.5 rounded-md text-[9.5px] sm:text-[10px] font-bold bg-emerald-600/90 text-white flex items-center gap-0.5 sm:gap-1 shadow-2xs backdrop-blur-xs z-20 border border-emerald-400/20">
                            <Check className="w-3 h-3 stroke-[3]" /> <span className="hidden xs:inline sm:inline">Đã học</span>
                          </span>
                        )}

                        {isSelected && (
                          <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-purple-600 text-white hidden sm:flex items-center gap-1 shadow-2xs z-20">
                            <Play className="w-3 h-3 fill-white" /> Đang chọn
                          </span>
                        )}
                      </div>

                      <div className="py-0.5 sm:py-0 sm:mt-3 space-y-1.5 flex-1 flex flex-col justify-between min-w-0">
                        <div>
                          {lesson.category && (
                            <span className="text-[10.5px] font-extrabold uppercase tracking-wider text-purple-600 dark:text-purple-400 block truncate mb-1 sm:hidden">
                              {lesson.category}
                            </span>
                          )}
                          <h3
                            className={`text-[14.5px] xs:text-[15.5px] sm:text-[13px] font-bold sm:font-semibold font-sans line-clamp-2 leading-snug transition-colors ${
                              isSelected
                                ? "text-purple-600 dark:text-purple-400"
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
                            {lesson.transcript?.length || 10} câu
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {/* 4. MAIN WORKSPACE: SINGLE-SENTENCE FOCUS STUDIO OR UNIFIED COMPLETION SUMMARY */}
      {selectedLessonId && currentLesson && (
        <>
          {isLessonFinished ? (
            /* GAMIFICATION BENTO HUB - LESSON COMPLETION SCREEN */
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="w-full min-h-[calc(100vh-60px)] flex flex-col justify-between p-4 sm:p-6 lg:p-8 space-y-6 max-w-6xl mx-auto font-sans"
            >
              {/* 1. Top Navigation Bar */}
              <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800 pb-4 gap-3 flex-wrap">
                <div className="flex items-center gap-3 min-w-0">
                  <button
                    onClick={handleBackToListing}
                    className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200/90 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5 cursor-pointer transition-colors shadow-2xs shrink-0 active:scale-95"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Quay lại</span>
                  </button>
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-bold bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-400 border border-blue-200/70 dark:border-blue-800/60 shadow-2xs">
                    {formatLevelBadge(currentLesson.level)}
                  </span>
                  <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-display truncate max-w-xl">
                    {currentLesson.title}
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-xs font-bold font-mono flex items-center gap-1.5 shadow-2xs">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{formatElapsedTime(elapsedTime)}</span>
                  </span>
                </div>
              </div>

              {/* 2. Center-Stage Hero Celebration Card */}
              <div className="p-6 sm:p-8 lg:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xl flex flex-col items-center text-center relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-36 bg-gradient-to-b from-amber-500/10 via-emerald-500/5 to-transparent pointer-events-none" />

                {/* Trophy with Radiant Aura */}
                <div className="relative mb-3.5 flex items-center justify-center">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-amber-400 to-amber-500 text-white flex items-center justify-center shadow-lg shadow-amber-500/30 ring-8 ring-amber-500/10">
                    <Trophy className="w-10 h-10 sm:w-12 sm:h-12 stroke-[2.2]" />
                  </div>
                  <span className="absolute -top-1 -right-1 text-2xl select-none">✨</span>
                </div>

                {/* Celebration Title & Description */}
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 dark:text-white font-display tracking-tight">
                  🎉 Chúc Mừng! Bạn Đã Hoàn Thành Bài Nghe!
                </h3>
                <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400 mt-1 max-w-md">
                  Bạn đã nghe và gõ chính xác toàn bộ các câu trong bài học này.
                </p>

                {/* 4 Bento Metric Cards (Rule 8 Wadhah Aloui) */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full max-w-3xl mt-6">
                  {/* Metric 1: XP Reward */}
                  <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/70 dark:border-amber-800/40 flex flex-col items-center justify-center shadow-2xs">
                    <span className="text-2xl sm:text-3xl font-black font-mono text-amber-500 dark:text-amber-400 tabular-nums">
                      +50 XP
                    </span>
                    <span className="text-[11.5px] font-bold text-amber-700 dark:text-amber-300 flex items-center gap-1 mt-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Thưởng kinh nghiệm</span>
                    </span>
                  </div>

                  {/* Metric 2: Accuracy */}
                  <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/70 dark:border-emerald-800/40 flex flex-col items-center justify-center shadow-2xs">
                    <span className="text-2xl sm:text-3xl font-black font-mono text-emerald-600 dark:text-emerald-400 tabular-nums">
                      100%
                    </span>
                    <span className="text-[11.5px] font-bold text-emerald-700 dark:text-emerald-300 flex items-center gap-1 mt-1">
                      <Target className="w-3.5 h-3.5" />
                      <span>Độ chính xác</span>
                    </span>
                  </div>

                  {/* Metric 3: Sentences Count */}
                  <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/70 dark:border-blue-800/40 flex flex-col items-center justify-center shadow-2xs">
                    <span className="text-2xl sm:text-3xl font-black font-mono text-[#0059bb] dark:text-sky-400 tabular-nums">
                      {totalSentencesCount}/{totalSentencesCount}
                    </span>
                    <span className="text-[11.5px] font-bold text-blue-700 dark:text-sky-300 flex items-center gap-1 mt-1">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Câu chép đúng</span>
                    </span>
                  </div>

                  {/* Metric 4: Total Elapsed Time */}
                  <div className="p-4 rounded-2xl bg-slate-100/70 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 flex flex-col items-center justify-center shadow-2xs">
                    <span className="text-2xl sm:text-3xl font-black font-mono text-slate-800 dark:text-slate-100 tabular-nums">
                      {formatElapsedTime(elapsedTime)}
                    </span>
                    <span className="text-[11.5px] font-bold text-slate-600 dark:text-slate-400 flex items-center gap-1 mt-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Thời gian hoàn thành</span>
                    </span>
                  </div>
                </div>

                {/* Action Buttons (Strict Rule 18 & 20 Hierarchy) */}
                <div className="flex items-center justify-center gap-3 pt-6 flex-wrap w-full">
                  <button
                    type="button"
                    onClick={() => {
                      setIsLessonFinished(false);
                      setCurrentSentenceIndex(0);
                      setSentencePlaybackTime(0);
                      setCompletedSentences({});
                    }}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs sm:text-sm shadow-2xs flex items-center gap-1.5 cursor-pointer transition-colors active:scale-95"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Luyện lại bài này</span>
                  </button>

                  <Link href={`/study/shadowing?lessonId=${currentLesson.id}`}>
                    <button className="px-5 py-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/60 text-[#0059bb] dark:text-sky-400 border border-blue-200/80 dark:border-blue-800/60 font-bold text-xs sm:text-sm shadow-2xs flex items-center gap-1.5 cursor-pointer transition-all active:scale-95">
                      <Mic className="w-4 h-4 text-[#0059bb] dark:text-sky-400" />
                      <span>Luyện Shadowing AI</span>
                    </button>
                  </Link>

                  {currentLesson.quizzes && currentLesson.quizzes.length > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        setIsLessonFinished(false);
                        setRightSidebarTab("quiz");
                      }}
                      className="px-5 py-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800/50 hover:bg-purple-100 font-bold text-xs sm:text-sm shadow-2xs flex items-center gap-1.5 cursor-pointer transition-all active:scale-95"
                    >
                      <Brain className="w-4 h-4 text-purple-600" />
                      <span>Làm Quiz ({currentLesson.quizzes.length} câu)</span>
                    </button>
                  )}

                  {lessonsList.findIndex((l) => l.id === currentLesson.id) + 1 < lessonsList.length && (
                    <button
                      type="button"
                      onClick={() => {
                        const nextIdx = lessonsList.findIndex((l) => l.id === currentLesson.id) + 1;
                        const nextId = lessonsList[nextIdx].id;
                        handleSelectLesson(nextId);
                        setIsLessonFinished(false);
                        setCurrentSentenceIndex(0);
                        setCompletedSentences({});
                        addToast({
                          type: "info",
                          title: `Đã chuyển sang Bài học #${nextIdx + 1}! 🎧`,
                        });
                      }}
                      className="px-6 py-2.5 rounded-xl bg-[#0059bb] hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer transition-all active:scale-95"
                    >
                      <span>Bài học tiếp theo</span>
                      <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                    </button>
                  )}
                </div>
              </div>

              {/* 3. Bottom Section: Next Recommended Lessons Grid */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>Bài học đề xuất tiếp theo cho bạn:</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleBackToListing}
                    className="text-xs font-semibold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>Xem tất cả danh mục</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 w-full">
                  {lessonsList
                    .filter((l) => l.id !== currentLesson.id)
                    .slice(0, 3)
                    .map((recLesson) => (
                      <motion.div
                        key={recLesson.id}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          handleSelectLesson(recLesson.id);
                          setIsLessonFinished(false);
                          setCurrentSentenceIndex(0);
                          setCompletedSentences({});
                        }}
                        className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-[#0059bb]/70 dark:hover:border-sky-500/70 transition-all cursor-pointer shadow-2xs hover:shadow-md group flex gap-3.5 items-center relative overflow-hidden"
                      >
                        <div className="w-[96px] h-[70px] shrink-0 rounded-xl overflow-hidden relative bg-slate-100 dark:bg-slate-800 border border-slate-200/70 dark:border-slate-700/60 shadow-2xs">
                          <LessonCoverImage
                            lesson={recLesson}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            showBadge={false}
                          />
                          <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded text-[9.5px] font-mono font-bold bg-slate-900/90 text-white backdrop-blur-xs z-10 shadow-2xs border border-white/15">
                            {formatLevelBadge(recLesson.level)}
                          </span>
                        </div>

                        <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5 space-y-1">
                          <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#0059bb] dark:text-sky-400 truncate">
                            {recLesson.category || "Giao tiếp"}
                          </span>
                          <h4 className="text-xs sm:text-[13px] font-bold text-slate-900 dark:text-white group-hover:text-[#0059bb] dark:group-hover:text-sky-400 transition-colors line-clamp-1 leading-snug">
                            {recLesson.title}
                          </h4>
                          <div className="flex items-center justify-between pt-1 border-t border-slate-100 dark:border-slate-800 text-[11px] font-mono text-slate-500 dark:text-slate-400">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3 text-slate-400" />
                              <span>{recLesson.duration || "3:00"}</span>
                            </span>
                            <div className="px-2.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-400 font-bold text-[11px] flex items-center gap-1 group-hover:bg-[#0059bb] group-hover:text-white transition-all shadow-2xs">
                              <span>Học</span>
                              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                </div>
              </div>
            </motion.div>
          ) : (
            /* 2-COLUMN SINGLE-SENTENCE STUDY MODE */
            <div
              id="active-listening-workspace"
              className="w-full h-full max-h-full flex flex-col overflow-hidden select-none"
            >
              {/* Top Unified Studio Navigation Bar (Border-Bottom Full-Width) */}
              <StudioTopHeader
                title={currentLesson.title}
                level={currentLesson.level}
                currentMode="listening"
                lessonQueryId={rawIdParam || selectedLessonId || "36"}
                isBookmarked={isCurrentSentenceBookmarked}
                accent={currentAccent}
                onAccentChange={(acc) => {
                  setCurrentAccent(acc);
                  addToast({
                    type: "info",
                    title: `Đã đổi giọng sang ${acc === "en-US" ? "Mỹ (US)" : acc === "en-GB" ? "Anh (UK)" : "Úc (AU)"}`,
                  });
                }}
                onToggleBookmark={handleToggleBookmark}
                onBack={handleBackToListing}
                rightExtraActions={
                  <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-xs font-bold flex items-center gap-1 shadow-2xs shrink-0 whitespace-nowrap">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{formatElapsedTime(elapsedTime)}</span>
                  </span>
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
                      layoutId="activeMobileStudioTabUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-slate-900 dark:bg-white rounded-t-full"
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
                      layoutId="activeMobileStudioTabUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-slate-900 dark:bg-white rounded-t-full"
                    />
                  )}
                </button>
              </div>

              {/* 2-Column Responsive Workspace: Left Main Dictation & Right Transcript Panel (Directly touching Header) */}
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
                              {(() => {
                                const sentenceDuration = Math.max(
                                  3,
                                  Math.ceil((currentSentence.text.trim().split(/\s+/).length / (2.2 * playbackSpeed)))
                                );

                                return (
                                  <StudioWaveformCard
                                    segmentIndex={currentSentenceIndex}
                                    totalSegments={totalSentencesCount}
                                    playbackTime={sentencePlaybackTime}
                                    duration={sentenceDuration}
                                    isPlaying={playingSentenceText === currentSentence.text}
                                    playbackSpeed={playbackSpeed}
                                    volume={currentVolume}
                                    onVolumeChange={(vol) => setCurrentVolume(vol)}
                                    onTogglePlay={() => {
                                      if (playingSentenceText === currentSentence.text) {
                                        stopTTS();
                                        setPlayingSentenceText(null);
                                      } else {
                                        setPlayingSentenceText(currentSentence.text);
                                        speakLessonText(currentSentence.text, {
                                          rate: playbackSpeed,
                                          lessonId: currentLesson.id,
                                          speakerIndex: currentSentenceIndex % 2,
                                          accent: currentAccent || currentLesson.accent,
                                          volume: currentVolume,
                                          onEnd: () => {
                                            setPlayingSentenceText(null);
                                            setSentencePlaybackTime(0);
                                          },
                                        });
                                      }
                                    }}
                                    onPrev={() => {
                                      if (currentSentenceIndex > 0) {
                                        stopTTS();
                                        setPlayingSentenceText(null);
                                        setCurrentSentenceIndex((prev) => prev - 1);
                                        setSentencePlaybackTime(0);
                                      }
                                    }}
                                    onNext={() => {
                                      stopTTS();
                                      setPlayingSentenceText(null);
                                      setSentencePlaybackTime(0);
                                      if (currentSentenceIndex < totalSentencesCount - 1) {
                                        setCurrentSentenceIndex((prev) => prev + 1);
                                      } else {
                                        setIsLessonFinished(true);
                                        markLessonCompleted(currentLesson.id);
                                        awardXp(50, "dictation");
                                        addToast({
                                          type: "success",
                                          title: "🎉 HOÀN THÀNH BÀI HỌC!",
                                          message:
                                            "Chúc mừng bạn đã hoàn thành xuất sắc toàn bộ bài nghe! +50 XP thưởng.",
                                        });

                                        // Persist complete status to PostgreSQL DB
                                        if (currentLesson) {
                                          const allIndices = Array.from(
                                            { length: totalSentencesCount },
                                            (_, i) => i
                                          );
                                          fetch("/api/listening/progress", {
                                            method: "POST",
                                            headers: { "Content-Type": "application/json" },
                                            body: JSON.stringify({
                                              userId: user?.id || "guest_user",
                                              lessonId: currentLesson.id,
                                              status: "COMPLETED",
                                              completedSentences: allIndices,
                                              bookmarkedSentences: savedSentenceKeys,
                                              timeSpent: Math.max(5, elapsedTime),
                                              xpEarned: 50,
                                            }),
                                          }).catch((e) =>
                                            console.error("Error saving complete progress to DB:", e)
                                          );
                                        }
                                      }
                                    }}
                                    onRewind5s={() => {
                                      setSentencePlaybackTime((prev) =>
                                        Math.max(0, prev - 5),
                                      );
                                      addToast({ type: "info", title: "Tua lùi 5s" });
                                    }}
                                    onForward5s={() => {
                                      setSentencePlaybackTime((prev) =>
                                        Math.min(sentenceDuration, prev + 5),
                                      );
                                      addToast({ type: "info", title: "Tua nhanh 5s" });
                                    }}
                                    onSeek={(time) => {
                                      setSentencePlaybackTime(Math.min(sentenceDuration, Math.max(0, time)));
                                    }}
                                    onSpeedChange={(spd) => {
                                      setPlaybackSpeed(spd);
                                      if (playingSentenceText === currentSentence.text) {
                                        speakLessonText(currentSentence.text, {
                                          rate: spd,
                                          lessonId: currentLesson.id,
                                          speakerIndex: currentSentenceIndex % 2,
                                          accent: currentAccent || currentLesson.accent,
                                          volume: currentVolume,
                                          onEnd: () => {
                                            setPlayingSentenceText(null);
                                            setSentencePlaybackTime(0);
                                          },
                                        });
                                      }
                                    }}
                                    isPrevDisabled={currentSentenceIndex === 0}
                                  />
                                );
                              })()}

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
                                    onClick={handleReportSentence}
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

                              {/* 2. MAIN DICTATION WORKSPACE (INPUT & WORD TOKENS) */}
                              <DictationWorkspace
                                key={`dict-${currentLesson.id}-${currentSentenceIndex}`}
                                sentenceText={currentSentence.text}
                                sentenceId={currentSentenceIndex}
                                translation={
                                  currentSentence.translation || currentSentence.vietnamese
                                }
                                ipa={currentSentence.ipa}
                                playbackSpeed={playbackSpeed}
                                fontSizeLevel={fontSizeLevel}
                                hideTranslation={hideTranslation}
                                onWordClick={handleWordClick}
                                onWordMatched={(word) => {
                                  awardXp(5, "dictation");
                                }}
                                onSentenceCompleted={() => {
                                  const nextCompleted = {
                                    ...completedSentences,
                                    [currentSentenceIndex]: true,
                                  };
                                  setCompletedSentences(nextCompleted);
                                  awardXp(20, "dictation");
                                  addToast({
                                    type: "success",
                                    title: "🎉 Hoàn thành câu!",
                                    message: "+20 XP! Bạn đã gõ chính xác 100% câu này.",
                                  });

                                  // Persist sentence progress to PostgreSQL DB
                                  if (currentLesson) {
                                    const completedArr = Object.keys(nextCompleted)
                                      .filter((k) => nextCompleted[Number(k)])
                                      .map(Number);
                                    const isCompleted =
                                      completedArr.length >= totalSentencesCount;

                                    if (isCompleted) {
                                      // 1. Lưu ghi nhận hoàn thành vào Profile & DailySkill
                                      fetch("/api/listening/progress", {
                                        method: "POST",
                                        headers: { "Content-Type": "application/json" },
                                        body: JSON.stringify({
                                          userId: user?.id || "guest_user",
                                          lessonId: currentLesson.id,
                                          status: "COMPLETED",
                                          completedSentences: completedArr,
                                          bookmarkedSentences: savedSentenceKeys,
                                          timeSpent: 5,
                                          xpEarned: 50,
                                        }),
                                      })
                                        .then(() => {
                                          // 2. Tự động xóa bản ghi tiến độ trong CSDL Neon PostgreSQL theo yêu cầu
                                          fetch(
                                            `/api/listening/progress?userId=${user?.id || "guest_user"}&lessonId=${currentLesson.id}`,
                                            { method: "DELETE" }
                                          ).catch((e) =>
                                            console.error("Error auto-deleting progress record from DB:", e)
                                          );
                                        })
                                        .catch((e) =>
                                          console.error("Error saving final progress before delete:", e)
                                        );

                                      setTimeout(() => {
                                        stopTTS();
                                        setPlayingSentenceText(null);
                                        setIsLessonFinished(true);
                                      }, 1000);
                                    } else {
                                      fetch("/api/listening/progress", {
                                        method: "POST",
                                        headers: { "Content-Type": "application/json" },
                                        body: JSON.stringify({
                                          userId: user?.id || "guest_user",
                                          lessonId: currentLesson.id,
                                          status: "IN_PROGRESS",
                                          completedSentences: completedArr,
                                          bookmarkedSentences: savedSentenceKeys,
                                          timeSpent: 5,
                                          xpEarned: 20,
                                        }),
                                      }).catch((e) =>
                                        console.error("Error saving sentence progress to DB:", e)
                                      );
                                    }
                                  }

                                  // Auto-advance if enabled
                                  if (
                                    autoNextSentence &&
                                    currentSentenceIndex < totalSentencesCount - 1
                                  ) {
                                    setTimeout(() => {
                                      stopTTS();
                                      setPlayingSentenceText(null);
                                      setCurrentSentenceIndex((prev) => prev + 1);
                                      setSentencePlaybackTime(0);
                                    }, 1400);
                                  }
                                }}
                              />
                            </div>
                          )}
                        </div>

                {/* CỘT PHẢI: INTERACTIVE TRANSCRIPT & PROGRESS PANEL (Full-Height with Border-L) */}
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
                      stopTTS();
                      setPlayingSentenceText(null);
                      setCurrentSentenceIndex(idx);
                      setSentencePlaybackTime(0);
                      setMobileStudioTab("dictation");
                    }}
                    onReplaySentence={(idx) => {
                      stopTTS();
                      const targetS = currentLesson.transcript?.[idx];
                      if (targetS) {
                        setPlayingSentenceText(targetS.text);
                        speakLessonText(targetS.text, {
                          rate: playbackSpeed,
                          lessonId: currentLesson.id,
                          speakerIndex: idx % 2,
                          accent: currentAccent || currentLesson.accent,
                          volume: currentVolume,
                          onEnd: () => setPlayingSentenceText(null),
                        });
                      }
                    }}
                    onNextSentence={() => {
                      if (currentSentenceIndex < totalSentencesCount - 1) {
                        stopTTS();
                        setPlayingSentenceText(null);
                        setCurrentSentenceIndex((prev) => prev + 1);
                        setSentencePlaybackTime(0);
                      }
                    }}
                    onResetProgress={() => {
                      setCompletedSentences({});
                      addToast({
                        type: "info",
                        title: "Đã đặt lại tiến độ bài học! ↺",
                        message: "Tiến độ học câu của bài đã được làm mới về 0%.",
                      });
                    }}
                    recommendedLessons={lessonsList
                      .filter((l) => l.id !== selectedLessonId)
                      .slice(0, 6)}
                    completedLessonIds={completedLessonIds}
                    onSelectLesson={(lessonId) => handleSelectLesson(String(lessonId))}
                    onShuffleRecommendations={() => {
                      setIsShufflingRecommendations(true);
                      setTimeout(() => {
                        setLessonsList((prev) => [...prev].sort(() => 0.5 - Math.random()));
                        setIsShufflingRecommendations(false);
                        addToast({
                          type: "info",
                          title: "Đã làm mới danh sách gợi ý bài học! ↺",
                        });
                      }, 200);
                    }}
                  />
                </div>
              </div>
            </div>
          )}
                </>
              )}

      {/* DEEP WORD DEFINITION DICTIONARY MODAL */}
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
                <div className="pt-2 border-t border-blue-200/60 dark:border-blue-900/40 text-xs text-slate-600 dark:text-slate-400 font-normal">
                  <span className="font-bold text-slate-700 dark:text-slate-300">
                    Ex:
                  </span>{" "}
                  {selectedWord.example}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SENTENCE REPORT MODAL */}
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
    </div>
  );
}

export default function ListeningPage() {
  return (
    <Suspense fallback={<ListeningListingSkeleton />}>
      <ListeningPageContent />
    </Suspense>
  );
}
