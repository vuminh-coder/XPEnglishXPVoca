"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "@/stores/authStore";
import { useNotificationStore } from "@/stores/notificationStore";
import { useListeningStore } from "@/stores/listeningStore";
import { useUiStore } from "@/stores/uiStore";
import { speakLessonText, stopTTS, prefetchAudioSentence } from "@/shared/utils/ttsEngine";
import { MOCK_LESSONS_DATA } from "@/features/listening/data/listeningMockData";
import { lookupWordDeep, DeepWordDefinition } from "@/features/vocabulary/data/deepDictionary";
import { pick10RandomLessons } from "@/features/listening/utils/randomLessonPicker";
import { formatLevelBadge } from "@/features/listening/components/InteractiveTranscriptSidebar";
import { useStudyTimeTracker } from "@/shared/hooks/useStudyTimeTracker";
import {
  ListeningListingView,
  ListeningCompletionScreen,
  ListeningStudioWorkspace,
  DeepDictionaryModal,
  SentenceReportModal,
  ListeningListingSkeleton,
  ListeningStudioSkeleton,
} from "@/features/listening";

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

// Dual Row Level Definition Sets
const BASIC_LEVELS = new Set(["Easy", "Beginner", "A1", "A2"]);
const ADVANCED_LEVELS = new Set(["Hard", "Advanced", "C1", "C2"]);

function ListeningPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawIdParam = searchParams.get("id") || searchParams.get("lessonId");

  const { user, awardXp } = useAuthStore();
  const { addToast } = useNotificationStore();
  const {
    setCurrentLessonId,
    markLessonCompleted,
    completedLessonIds,
  } = useListeningStore();
  const { setSidebarCollapsed, setHideBottomNav } = useUiStore();

  // Lessons list state (pre-initialized with curated catalog + background DB sync)
  const [lessonsList, setLessonsList] = useState<any[]>(() => MOCK_LESSONS_DATA);
  const [isLoadingLessons, setIsLoadingLessons] = useState(!rawIdParam);

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

  const currentSentence =
    currentLesson?.transcript?.[currentSentenceIndex] ||
    (currentLesson?.transcript && currentLesson.transcript.length > 0
      ? currentLesson.transcript[0]
      : null);

  const totalSentencesCount = currentLesson?.transcript?.length || 0;

  // Practice timer state (seconds elapsed)
  const [elapsedTime, setElapsedTime] = useState(0);
  const elapsedTimeRef = useRef(0);

  // Sentence Utility Toolbar States
  const [savedSentenceKeys, setSavedSentenceKeys] = useState<string[]>([]);
  const [, setCloudNoteText] = useState("");

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

  // Zero-latency Audio Prefetch: Prefetch sentence N+1 in memory
  useEffect(() => {
    if (!currentLesson?.transcript) return;
    const nextSentence = currentLesson.transcript[currentSentenceIndex + 1];
    if (nextSentence?.text) {
      prefetchAudioSentence(nextSentence.text, currentAccent);
    }
  }, [currentLesson, currentSentenceIndex, currentAccent]);

  // 1. Fetch Lessons Catalog from PostgreSQL Neon Database
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const fetchLessons = async () => {
      try {
        setIsLoadingLessons(true);
        const res = await fetch(`/api/listening/lessons?userId=${user?.id || ""}`, {
          signal: controller.signal,
          headers: { Accept: "application/json" },
        });
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        const json = await res.json();
        if (isMounted && json.success && Array.isArray(json.data) && json.data.length > 0) {
          setLessonsList(json.data);
        } else if (isMounted) {
          setLessonsList(MOCK_LESSONS_DATA);
        }
      } catch (err: any) {
        if (err?.name === "AbortError") return;
        console.warn("[Listening] DB fetch fallback to offline cache:", err?.message || err);
        if (isMounted) setLessonsList(MOCK_LESSONS_DATA);
      } finally {
        if (isMounted) {
          setTimeout(() => {
            if (isMounted) setIsLoadingLessons(false);
          }, 240);
        }
      }
    };
    fetchLessons();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [user?.id]);

  const [isLoadingLessonDetail, setIsLoadingLessonDetail] = useState<boolean>(() => !!rawIdParam);
  const [, setIsSyncingDb] = useState(false);
  const [isShufflingBasic, setIsShufflingBasic] = useState(false);
  const [isShufflingAdvanced, setIsShufflingAdvanced] = useState(false);
  const [isShufflingRecommendations, setIsShufflingRecommendations] = useState(false);

  // 2. Fetch Single Lesson Details & User Progress from Database
  useEffect(() => {
    if (!selectedLessonId) return;
    let isMounted = true;
    const controller = new AbortController();
    const fetchLessonDetail = async () => {
      try {
        setIsLoadingLessonDetail(true);
        const res = await fetch(
          `/api/listening/lessons/${selectedLessonId}?userId=${user?.id || ""}`,
          {
            signal: controller.signal,
            headers: { Accept: "application/json" },
          }
        );
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        const json = await res.json();
        if (isMounted && json.success && json.data) {
          const detail = json.data;
          setLessonsList((prev) => {
            if (prev.some((l) => l.id === detail.id)) return prev;
            return [detail, ...prev];
          });
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
      } catch (err: any) {
        if (err?.name === "AbortError") return;
        console.warn("[Listening] Detail DB fetch fallback to local lesson:", err?.message || err);
        if (isMounted) {
          const fallbackLesson = MOCK_LESSONS_DATA.find((l) => l.id === selectedLessonId);
          if (fallbackLesson) {
            setLessonsList((prev) => {
              if (prev.some((l) => l.id === fallbackLesson.id)) return prev;
              return [fallbackLesson, ...prev];
            });
          }
        }
      } finally {
        if (isMounted) {
          setTimeout(() => {
            if (isMounted) setIsLoadingLessonDetail(false);
          }, 200);
        }
      }
    };
    fetchLessonDetail();
    return () => {
      isMounted = false;
      controller.abort();
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

  useEffect(() => {
    elapsedTimeRef.current = elapsedTime;
  }, [elapsedTime]);

  // Practice time tracker
  useStudyTimeTracker("dictation", {
    activeCondition: !!selectedLessonId,
  });

  // Practice overall timer
  useEffect(() => {
    if (!selectedLessonId) return;

    const timer = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [selectedLessonId]);

  // Sentence Audio Timer
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

  useEffect(() => {
    return () => setHideBottomNav(false);
  }, [setHideBottomNav]);

  const [listingSearch, setListingSearch] = useState("");

  const [displayedBasicLessons, setDisplayedBasicLessons] = useState<any[]>([]);
  const [displayedAdvancedLessons, setDisplayedAdvancedLessons] = useState<any[]>([]);

  useEffect(() => {
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

  const handleSelectLesson = (lessonId: string) => {
    stopTTS();
    setPlayingSentenceText(null);
    setIsLoadingLessonDetail(true);
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

  const handleSpeakSentence = (text: string, index: number) => {
    speakLessonText(text, {
      rate: playbackSpeed,
      lessonId: currentLesson?.id,
      speakerIndex: index % 2,
      accent: currentAccent || currentLesson?.accent,
      volume: currentVolume,
      onEnd: () => {
        setPlayingSentenceText(null);
        setSentencePlaybackTime(0);
      },
    });
  };

  const handleTogglePlayCurrentSentence = () => {
    if (!currentSentence) return;
    if (playingSentenceText === currentSentence.text) {
      stopTTS();
      setPlayingSentenceText(null);
    } else {
      setPlayingSentenceText(currentSentence.text);
      handleSpeakSentence(currentSentence.text, currentSentenceIndex);
    }
  };

  const handleNextSentenceInStudio = () => {
    stopTTS();
    setPlayingSentenceText(null);
    setSentencePlaybackTime(0);
    if (currentSentenceIndex < totalSentencesCount - 1) {
      setCurrentSentenceIndex((prev) => prev + 1);
    } else {
      setIsLessonFinished(true);
      if (currentLesson) {
        markLessonCompleted(currentLesson.id);
      }
      awardXp(50, "dictation");
      addToast({
        type: "success",
        title: "🎉 HOÀN THÀNH BÀI HỌC!",
        message: "Chúc mừng bạn đã hoàn thành xuất sắc toàn bộ bài nghe! +50 XP thưởng.",
      });

      if (currentLesson) {
        const allIndices = Array.from({ length: totalSentencesCount }, (_, i) => i);
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
        }).catch((e) => console.error("Error saving complete progress to DB:", e));
      }
    }
  };

  const handleSentenceCompleted = () => {
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

    if (currentLesson) {
      const completedArr = Object.keys(nextCompleted)
        .filter((k) => nextCompleted[Number(k)])
        .map(Number);
      const isCompleted = completedArr.length >= totalSentencesCount;

      if (isCompleted) {
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
            fetch(
              `/api/listening/progress?userId=${user?.id || "guest_user"}&lessonId=${currentLesson.id}`,
              { method: "DELETE" }
            ).catch((e) => console.error("Error auto-deleting progress record from DB:", e));
          })
          .catch((e) => console.error("Error saving final progress before delete:", e));

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
        }).catch((e) => console.error("Error saving sentence progress to DB:", e));
      }
    }

    if (autoNextSentence && currentSentenceIndex < totalSentencesCount - 1) {
      setTimeout(() => {
        stopTTS();
        setPlayingSentenceText(null);
        setCurrentSentenceIndex((prev) => prev + 1);
        setSentencePlaybackTime(0);
      }, 1400);
    }
  };

  // Keyboard shortcuts listener
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
            handleSpeakSentence(sentence.text, currentSentenceIndex);
          }
        }
      } else if ((e.key === "Control" || (e.ctrlKey && e.code === "KeyR")) && !isTyping) {
        e.preventDefault();
        stopTTS();
        setSentencePlaybackTime(0);
        const sentence = currentLesson?.transcript?.[currentSentenceIndex];
        if (sentence?.text) {
          setPlayingSentenceText(sentence.text);
          handleSpeakSentence(sentence.text, currentSentenceIndex);
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

  // Loading Fallbacks (0px CLS Geometric Skeletons)
  if (selectedLessonId && (isLoadingLessonDetail || !currentLesson)) {
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
      <AnimatePresence mode="wait">
        {!selectedLessonId ? (
          <motion.div
            key="listening-listing-view"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="w-full flex-1 flex flex-col"
          >
            <ListeningListingView
              lessonsList={lessonsList}
              selectedLessonId={selectedLessonId}
              onSelectLesson={handleSelectLesson}
              completedLessonIds={completedLessonIds}
              listingSearch={listingSearch}
              setListingSearch={setListingSearch}
              showCreateForm={showCreateForm}
              setShowCreateForm={setShowCreateForm}
              createModeTab={createModeTab}
              setCreateModeTab={setCreateModeTab}
              youtubeUrl={youtubeUrl}
              setYoutubeUrl={setYoutubeUrl}
              newTitle={newTitle}
              setNewTitle={setNewTitle}
              newThumbnail={newThumbnail}
              setNewThumbnail={setNewThumbnail}
              newText={newText}
              setNewText={setNewText}
              newAccent={newAccent}
              setNewAccent={setNewAccent}
              newLevel={newLevel}
              setNewLevel={setNewLevel}
              isExtractingYoutube={isExtractingYoutube}
              isCreatingLesson={isCreatingLesson}
              handleCreateArticle={handleCreateArticle}
              handleShuffleBasic={handleShuffleBasic}
              handleShuffleAdvanced={handleShuffleAdvanced}
              isShufflingBasic={isShufflingBasic}
              isShufflingAdvanced={isShufflingAdvanced}
              displayedBasicLessons={displayedBasicLessons}
              displayedAdvancedLessons={displayedAdvancedLessons}
            />
          </motion.div>
        ) : isLessonFinished ? (
          <motion.div
            key={`listening-completed-${selectedLessonId}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="w-full flex-1 flex flex-col"
          >
            <ListeningCompletionScreen
              currentLesson={currentLesson}
              lessonsList={lessonsList}
              totalSentencesCount={totalSentencesCount}
              elapsedTime={elapsedTime}
              onRestart={() => {
                setIsLessonFinished(false);
                setCurrentSentenceIndex(0);
                setSentencePlaybackTime(0);
                setCompletedSentences({});
              }}
              onNextLesson={(nextLessonId) => {
                handleSelectLesson(nextLessonId);
                setIsLessonFinished(false);
                setCurrentSentenceIndex(0);
                setCompletedSentences({});
              }}
              onSelectLesson={(recId) => {
                handleSelectLesson(recId);
                setIsLessonFinished(false);
                setCurrentSentenceIndex(0);
                setCompletedSentences({});
              }}
              onBackToListing={handleBackToListing}
              formatElapsedTime={formatElapsedTime}
              formatLevelBadge={formatLevelBadge}
            />
          </motion.div>
        ) : (
          <motion.div
            key={`listening-studio-${selectedLessonId}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="w-full h-full flex flex-col"
          >
            {currentSentence && (
              <ListeningStudioWorkspace
                currentLesson={currentLesson}
                lessonsList={lessonsList}
                selectedLessonId={selectedLessonId}
                rawIdParam={rawIdParam}
                currentSentenceIndex={currentSentenceIndex}
                setCurrentSentenceIndex={setCurrentSentenceIndex}
                totalSentencesCount={totalSentencesCount}
                currentSentence={currentSentence}
                playingSentenceText={playingSentenceText}
                setPlayingSentenceText={setPlayingSentenceText}
                sentencePlaybackTime={sentencePlaybackTime}
                setSentencePlaybackTime={setSentencePlaybackTime}
                playbackSpeed={playbackSpeed}
                setPlaybackSpeed={setPlaybackSpeed}
                currentVolume={currentVolume}
                setCurrentVolume={setCurrentVolume}
                currentAccent={currentAccent}
                onAccentChange={(acc) => {
                  setCurrentAccent(acc);
                  addToast({
                    type: "info",
                    title: `Đã đổi giọng sang ${acc === "en-US" ? "Mỹ (US)" : acc === "en-GB" ? "Anh (UK)" : "Úc (AU)"}`,
                  });
                }}
                isCurrentSentenceBookmarked={isCurrentSentenceBookmarked}
                onToggleBookmark={handleToggleBookmark}
                onReportSentence={handleReportSentence}
                fontSizeLevel={fontSizeLevel}
                onAdjustFontSize={handleAdjustFontSize}
                autoNextSentence={autoNextSentence}
                setAutoNextSentence={setAutoNextSentence}
                hideTranslation={hideTranslation}
                setHideTranslation={setHideTranslation}
                completedSentences={completedSentences}
                completedLessonIds={completedLessonIds}
                isLoadingLessonDetail={isLoadingLessonDetail}
                isShufflingRecommendations={isShufflingRecommendations}
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
                elapsedTime={elapsedTime}
                formatElapsedTime={formatElapsedTime}
                onBackToListing={handleBackToListing}
                onSelectLesson={handleSelectLesson}
                onSentenceCompleted={handleSentenceCompleted}
                onWordMatched={() => awardXp(5, "dictation")}
                onWordClick={handleWordClick}
                onTogglePlayCurrentSentence={handleTogglePlayCurrentSentence}
                onSpeakSentence={handleSpeakSentence}
                onStopTTS={stopTTS}
                onNextSentenceInStudio={handleNextSentenceInStudio}
                onResetProgress={() => {
                  setCompletedSentences({});
                  addToast({
                    type: "info",
                    title: "Đã đặt lại tiến độ bài học! ↺",
                    message: "Tiến độ học câu của bài đã được làm mới về 0%.",
                  });
                }}
                onToast={addToast}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* DICTIONARY MODAL */}
      <DeepDictionaryModal
        selectedWord={selectedWord}
        onClose={() => setSelectedWord(null)}
        onSpeak={(word) => speakLessonText(word, { lessonId: currentLesson?.id, rate: 1.0 })}
      />

      {/* SENTENCE REPORT MODAL */}
      <SentenceReportModal
        isOpen={showReportModal}
        sentenceIndex={currentSentenceIndex}
        reportReason={reportReason}
        onReasonChange={setReportReason}
        reportDescription={reportDescription}
        onDescriptionChange={setReportDescription}
        onSubmit={handleSubmitReport}
        onClose={() => setShowReportModal(false)}
      />
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
