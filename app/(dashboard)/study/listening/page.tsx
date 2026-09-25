"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback, Suspense } from "react";
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
import dynamic from "next/dynamic";
import {
  ListeningListingView,
  ListeningCompletionScreen,
  ListeningStudioWorkspace,
  ListeningListingSkeleton,
  ListeningStudioSkeleton,
} from "@/features/listening";

const DeepDictionaryModal = dynamic(
  () => import("@/features/listening").then((m) => m.DeepDictionaryModal),
  { ssr: false }
);

const SentenceReportModal = dynamic(
  () => import("@/features/listening").then((m) => m.SentenceReportModal),
  { ssr: false }
);

import {
  resolveCanonicalLessonId,
  isSameLessonId,
  resolveLessonId,
} from "@/features/listening/utils/lessonIdHelper";

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

  // Lessons list state (Dashboard SWR Architecture: Frame-0 synchronous localStorage hydration)
  const [lessonsList, setLessonsList] = useState<any[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const cached =
        localStorage.getItem("xp_voca_listening_catalog_cache") ||
        localStorage.getItem("xp_voca_listening_catalog_guest");
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return [];
  });

  // Detailed lessons map with multi-key aliasing (e.g. "40" -> "listen_toeic_q3_040" -> "040")
  const [detailedLessonsMap, setDetailedLessonsMap] = useState<Record<string, any>>(() => {
    if (typeof window === "undefined" || !rawIdParam) return {};
    try {
      const map: Record<string, any> = {};
      const canonical = resolveCanonicalLessonId(rawIdParam);
      const num = parseInt(rawIdParam, 10);
      const pad3 = !isNaN(num) ? String(num).padStart(3, "0") : "";

      const keysToProbe = [
        rawIdParam,
        canonical,
        `listen_${pad3}`,
        pad3,
        `xp_voca_listening_detail_${rawIdParam}_guest`,
        `xp_voca_listening_detail_${rawIdParam}`,
        canonical ? `xp_voca_listening_detail_${canonical}_guest` : null,
        canonical ? `xp_voca_listening_detail_${canonical}` : null,
      ].filter(Boolean) as string[];

      for (const k of keysToProbe) {
        const raw = localStorage.getItem(k.startsWith("xp_") ? k : `xp_voca_listening_detail_${k}_guest`) || localStorage.getItem(k);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (parsed && parsed.transcript?.length) {
            map[parsed.id] = parsed;
            map[rawIdParam] = parsed;
            if (canonical) map[canonical] = parsed;
            if (pad3) {
              map[pad3] = parsed;
              map[`listen_${pad3}`] = parsed;
            }
            break;
          }
        }
      }
      return map;
    } catch {
      return {};
    }
  });

  const [isLoadingLessons, setIsLoadingLessons] = useState<boolean>(() => {
    if (rawIdParam) return false;
    if (typeof window === "undefined") return true;
    try {
      const cached =
        localStorage.getItem("xp_voca_listening_catalog_cache") ||
        localStorage.getItem("xp_voca_listening_catalog_guest");
      return !cached;
    } catch {
      return true;
    }
  });

  const [isLoadingLessonDetail, setIsLoadingLessonDetail] = useState<boolean>(() => {
    if (!rawIdParam) return false;
    if (typeof window === "undefined") return true;
    try {
      const canonical = resolveCanonicalLessonId(rawIdParam);
      const num = parseInt(rawIdParam, 10);
      const pad3 = !isNaN(num) ? String(num).padStart(3, "0") : "";
      const keysToProbe = [
        `xp_voca_listening_detail_${rawIdParam}_guest`,
        `xp_voca_listening_detail_${rawIdParam}`,
        canonical ? `xp_voca_listening_detail_${canonical}_guest` : null,
        canonical ? `xp_voca_listening_detail_${canonical}` : null,
        (pad3 ? `xp_voca_listening_detail_listen_${pad3}_guest` : null),
      ].filter(Boolean) as string[];

      for (const k of keysToProbe) {
        const raw = localStorage.getItem(k);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (parsed?.transcript?.length) return false;
        }
      }
      return true;
    } catch {
      return true;
    }
  });

  // Selected lesson state (Frame 0 Synchronous Canonical Normalization)
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(() => {
    if (!rawIdParam) return null;
    return resolveCanonicalLessonId(rawIdParam) || rawIdParam;
  });

  // Universal lesson resolution helper with full alias support
  const currentLesson = useMemo(() => {
    if (!selectedLessonId && !rawIdParam) return null;
    const lookupKey = selectedLessonId || rawIdParam || "";
    const canonical = resolveCanonicalLessonId(lookupKey, lessonsList);

    // 1. Direct match in detailedLessonsMap by canonical or lookupKey
    if (canonical && detailedLessonsMap[canonical]?.transcript?.length) {
      return detailedLessonsMap[canonical];
    }
    if (detailedLessonsMap[lookupKey]?.transcript?.length) {
      return detailedLessonsMap[lookupKey];
    }

    // 2. Pad3 / numeric alias match in detailed map
    const num = parseInt(lookupKey.replace(/\D/g, "") || lookupKey, 10);
    if (!isNaN(num)) {
      const pad3 = String(num).padStart(3, "0");
      if (detailedLessonsMap[pad3]?.transcript?.length) return detailedLessonsMap[pad3];
      if (detailedLessonsMap[`listen_${pad3}`]?.transcript?.length) return detailedLessonsMap[`listen_${pad3}`];
      if (detailedLessonsMap[String(num)]?.transcript?.length) return detailedLessonsMap[String(num)];
      for (const val of Object.values(detailedLessonsMap)) {
        if (val && (isSameLessonId(val.id, lookupKey) || isSameLessonId(val.id, canonical))) {
          if (val.transcript?.length) return val;
        }
      }
    }

    // 3. Match from lessonsList (from DB or SWR Cache)
    if (lessonsList.length > 0) {
      const resolvedId = canonical || resolveCanonicalLessonId(lookupKey, lessonsList);
      if (resolvedId) {
        if (detailedLessonsMap[resolvedId]?.transcript?.length) return detailedLessonsMap[resolvedId];
        const fromList = lessonsList.find((l) => isSameLessonId(l.id, resolvedId));
        if (fromList?.transcript?.length) return fromList;
      }
      const directFromList = lessonsList.find((l) => isSameLessonId(l.id, lookupKey));
      if (directFromList?.transcript?.length) return directFromList;
    }

    // 4. TRUE SWR: Offline in-memory mock fallback in RAM (0ms instant display)
    // Never freeze user for 5-8s while Neon DB cold starts!
    const fallbackId = canonical || resolveCanonicalLessonId(lookupKey, MOCK_LESSONS_DATA) || lookupKey;
    const fromMock = MOCK_LESSONS_DATA.find((l) => isSameLessonId(l.id, fallbackId));
    if (fromMock?.transcript?.length) return fromMock;

    // 5. While DB is actively fetching detail for an unknown lesson, wait for DB
    if (isLoadingLessonDetail) return null;

    return null;
  }, [selectedLessonId, rawIdParam, detailedLessonsMap, lessonsList, isLoadingLessonDetail]);

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

  // Isolated practice timer (updated by StudioTimerBadge)
  const elapsedTimeRef = useRef(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const handleElapsedTimeTick = useCallback((sec: number) => {
    elapsedTimeRef.current = sec;
    setElapsedTime(sec);
  }, []);

  // Debounce ref for background database progress sync (1.2s debounce)
  const progressDebounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (progressDebounceTimerRef.current) {
        clearTimeout(progressDebounceTimerRef.current);
      }
    };
  }, []);

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

  // 1. SWR Instant 0ms Local Cache Hydration & Background Neon DB Fetch for Catalog (Dashboard Architecture)
  useEffect(() => {
    let isMounted = true;
    const catalogCacheKey = `xp_voca_listening_catalog_${user?.id || "guest"}`;

    // Tầng 1: SWR 0ms Instant Local Cache Hydration
    if (typeof window !== "undefined") {
      try {
        const raw = localStorage.getItem(catalogCacheKey);
        if (raw) {
          const cached = JSON.parse(raw);
          if (Array.isArray(cached) && cached.length > 0) {
            setLessonsList(cached);
            setIsLoadingLessons(false);
          }
        }
      } catch (err) {
        console.warn("[Listening] Failed to load cached catalog:", err);
      }
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    // Tầng 2: Background Neon Database Reconciliation
    const fetchLessons = async () => {
      try {
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
          try {
            localStorage.setItem(catalogCacheKey, JSON.stringify(json.data));
          } catch (e) {}
        } else if (isMounted && lessonsList.length === 0) {
          setLessonsList(MOCK_LESSONS_DATA);
        }
      } catch (err: any) {
        if (!isMounted) return;
        if (err?.name === "AbortError") {
          console.warn("[Listening] Catalog DB request timed out.");
        } else {
          console.warn("[Listening] DB fetch fallback to offline cache:", err?.message || err);
        }
        if (isMounted && lessonsList.length === 0) {
          setLessonsList(MOCK_LESSONS_DATA);
          addToast({
            type: "warning",
            title: "Chế độ offline",
            message: "Không thể tải danh mục từ máy chủ Neon. Đang hiển thị danh mục offline.",
          });
        }
      } finally {
        clearTimeout(timeoutId);
        if (isMounted) setIsLoadingLessons(false);
      }
    };
    fetchLessons();
    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [user?.id, addToast]);

  const [, setIsSyncingDb] = useState(false);
  const [isShufflingBasic, setIsShufflingBasic] = useState(false);
  const [isShufflingAdvanced, setIsShufflingAdvanced] = useState(false);
  const [isShufflingRecommendations, setIsShufflingRecommendations] = useState(false);

  // Sync URL ?id= param with database lessons (Dashboard Architecture with SWR)
  // Cache guard uses ref & alias comparison to prevent infinite re-fetching
  const lastFetchedLessonRef = useRef<string | null>(null);
  const isLeavingStudioRef = useRef(false);

  // Synchronous resolution of canonical lesson id
  const canonicalQueryId = useMemo(() => {
    return resolveCanonicalLessonId(selectedLessonId || rawIdParam, lessonsList);
  }, [selectedLessonId, rawIdParam, lessonsList]);

  // 2. SWR Instant 0ms Local Cache Hydration & Background Neon DB Fetch for Lesson Detail (Dashboard Architecture)
  useEffect(() => {
    if (!selectedLessonId && !rawIdParam) {
      setIsLoadingLessonDetail(false);
      lastFetchedLessonRef.current = null;
      return;
    }

    if (isLeavingStudioRef.current) return;

    const queryLessonId: string = canonicalQueryId || selectedLessonId || rawIdParam || "";
    if (!queryLessonId) return;

    // Cache guard: If already fetched or present in detailedLessonsMap, do not re-fetch
    if (
      lastFetchedLessonRef.current &&
      isSameLessonId(lastFetchedLessonRef.current, queryLessonId) &&
      detailedLessonsMap[queryLessonId]?.transcript?.length
    ) {
      setIsLoadingLessonDetail(false);
      return;
    }

    let isMounted = true;
    const detailCacheKey = `xp_voca_listening_detail_${queryLessonId}_${user?.id || "guest"}`;

    // Tầng 1: SWR 0ms Instant Local Cache Hydration
    if (typeof window !== "undefined") {
      try {
        const raw = localStorage.getItem(detailCacheKey);
        if (raw) {
          const cached = JSON.parse(raw);
          if (cached && cached.id && Array.isArray(cached.transcript) && cached.transcript.length > 0) {
            setDetailedLessonsMap((prev) => {
              const next: Record<string, any> = {
                ...prev,
                [cached.id]: cached,
                [queryLessonId]: cached,
              };
              if (rawIdParam) next[rawIdParam] = cached;
              return next;
            });
            setIsLoadingLessonDetail(false);
            if (cached.userProgress) {
              const prog = cached.userProgress;
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
                elapsedTimeRef.current = prog.timeSpent;
              }
              if (prog.status === "COMPLETED") {
                setIsLessonFinished(true);
              }
            }
            if (cached.userNote !== undefined) {
              setCloudNoteText(cached.userNote || "");
            }
          }
        }
      } catch (err) {
        console.warn("[Listening] Failed to load cached lesson detail:", err);
      }
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    // Tầng 2: Background Neon Database Reconciliation
    const fetchLessonDetail = async () => {
      try {
        const res = await fetch(
          `/api/listening/lessons/${queryLessonId}?userId=${user?.id || ""}`,
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
          lastFetchedLessonRef.current = detail.id;

          setDetailedLessonsMap((prev) => {
            const next: Record<string, any> = {
              ...prev,
              [detail.id]: detail,
              [queryLessonId]: detail,
            };
            if (rawIdParam) next[rawIdParam] = detail;
            const num = parseInt((detail.id || "").replace(/\D/g, "") || rawIdParam || "", 10);
            if (!isNaN(num)) {
              const pad3 = String(num).padStart(3, "0");
              next[pad3] = detail;
              next[`listen_${pad3}`] = detail;
              next[String(num)] = detail;
            }
            return next;
          });

          if (selectedLessonId !== detail.id && !isSameLessonId(selectedLessonId, detail.id)) {
            setSelectedLessonId(detail.id);
            setCurrentLessonId(detail.id);
          }

          try {
            localStorage.setItem(detailCacheKey, JSON.stringify(detail));
            localStorage.setItem(`xp_voca_listening_detail_${detail.id}_${user?.id || "guest"}`, JSON.stringify(detail));
            if (rawIdParam) {
              localStorage.setItem(`xp_voca_listening_detail_${rawIdParam}_${user?.id || "guest"}`, JSON.stringify(detail));
            }
          } catch (e) {}

          setLessonsList((prev) => {
            const idx = prev.findIndex((l) => isSameLessonId(l.id, detail.id));
            if (idx !== -1) {
              const updated = [...prev];
              updated[idx] = { ...updated[idx], ...detail };
              return updated;
            }
            return prev.length > 0 ? [detail, ...prev] : prev;
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
              elapsedTimeRef.current = prog.timeSpent;
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
        if (!isMounted) return;
        if (err?.name === "AbortError") {
          console.warn("[Listening] Lesson detail request timed out.");
        } else {
          console.warn("[Listening] Detail DB fetch fallback to local lesson:", err?.message || err);
        }
        if (isMounted) {
          const fallbackLesson =
            MOCK_LESSONS_DATA.find((l) => isSameLessonId(l.id, queryLessonId)) ||
            MOCK_LESSONS_DATA.find((l) => l.id === queryLessonId);
          if (fallbackLesson) {
            lastFetchedLessonRef.current = fallbackLesson.id;
            setDetailedLessonsMap((prev) => ({
              ...prev,
              [fallbackLesson.id]: fallbackLesson,
              [queryLessonId]: fallbackLesson,
            }));
          }
        }
      } finally {
        clearTimeout(timeoutId);
        if (isMounted) setIsLoadingLessonDetail(false);
      }
    };
    fetchLessonDetail();
    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [canonicalQueryId, user?.id, rawIdParam, addToast]);

  // Current sentence bookmark key
  const currentSentenceKey = `${selectedLessonId || "lesson"}_${currentSentenceIndex}`;
  const isCurrentSentenceBookmarked = savedSentenceKeys.includes(currentSentenceKey);

  const handleToggleBookmark = useCallback(async () => {
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

    if (currentLesson && user?.id && !user.id.startsWith("guest")) {
      setIsSyncingDb(true);
      try {
        await fetch("/api/listening/progress", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user.id,
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
  }, [isCurrentSentenceBookmarked, savedSentenceKeys, currentSentenceKey, addToast, awardXp, currentSentence, currentLesson, user]);

  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState<string>("spelling");
  const [reportDescription, setReportDescription] = useState<string>("");

  const handleReportSentence = useCallback(() => {
    setShowReportModal(true);
  }, []);

  const handleSubmitReport = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setShowReportModal(false);
    setReportDescription("");
    addToast({
      type: "success",
      title: "🚩 Đã gửi phản ánh thành công!",
      message:
        "Cảm ơn bạn đã đóng góp! Ban biên tập sẽ kiểm tra và cập nhật câu trong 24h.",
    });
  }, [addToast]);

  const handleAdjustFontSize = useCallback((delta: number) => {
    setFontSizeLevel((prevLevel) => {
      const nextLevel = Math.max(0, Math.min(3, prevLevel + delta));
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
      return nextLevel;
    });
  }, [addToast]);

  // Practice time tracker
  useStudyTimeTracker("dictation", {
    activeCondition: !!selectedLessonId,
  });

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
    if (rawIdParam && !isLeavingStudioRef.current) {
      const canonical = resolveCanonicalLessonId(rawIdParam, lessonsList);
      if (canonical && !isSameLessonId(selectedLessonId, canonical)) {
        setSelectedLessonId(canonical);
        setCurrentLessonId(canonical);
        setSidebarCollapsed(true);
      }
    }
  }, [rawIdParam, lessonsList, selectedLessonId, setCurrentLessonId, setSidebarCollapsed]);

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

  const handleSelectLesson = useCallback((lessonId: string) => {
    stopTTS();
    setPlayingSentenceText(null);
    const canonical = resolveCanonicalLessonId(lessonId, lessonsList);
    const isCached =
      !!detailedLessonsMap[lessonId]?.transcript?.length ||
      (canonical ? !!detailedLessonsMap[canonical]?.transcript?.length : false);
    setIsLoadingLessonDetail(!isCached);
    setSelectedLessonId(canonical || lessonId);
    setCurrentLessonId(canonical || lessonId);
    setIsLessonFinished(false);
    setCurrentSentenceIndex(0);
    setSentencePlaybackTime(0);
    setSidebarCollapsed(true);
    try {
      localStorage.setItem("xp_voca_last_listening_lesson", canonical || lessonId);
    } catch {}

    const lessonIdx = lessonsList.findIndex((l) => isSameLessonId(l.id, lessonId));
    if (lessonIdx !== -1) {
      router.push(`/study/listening?id=${lessonIdx + 1}`);
    } else {
      router.push(`/study/listening?id=${lessonId}`);
    }
  }, [lessonsList, router, setCurrentLessonId, setSidebarCollapsed, detailedLessonsMap]);

  const handleBackToListing = useCallback(() => {
    isLeavingStudioRef.current = true;
    stopTTS();
    setPlayingSentenceText(null);
    setSelectedLessonId(null);
    setCurrentLessonId("");
    setIsLessonFinished(false);
    setCurrentSentenceIndex(0);
    setSentencePlaybackTime(0);
    setSidebarCollapsed(false);
    lastFetchedLessonRef.current = null;
    localStorage.removeItem("xp_voca_last_listening_lesson");
    router.push("/study/listening");
    setTimeout(() => {
      isLeavingStudioRef.current = false;
    }, 400);
  }, [router, setCurrentLessonId, setSidebarCollapsed]);

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

  const handleWordClick = useCallback((word: string) => {
    const cleanWord = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "").trim();
    if (!cleanWord) return;

    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    if (isMobile) {
      speakLessonText(cleanWord, { lessonId: currentLesson?.id, rate: 1.0 });
      return;
    }

    const deepDef = lookupWordDeep(cleanWord);
    setSelectedWord(deepDef);
  }, [currentLesson?.id]);

  const handleSpeakSentence = useCallback((text: string, index: number) => {
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
  }, [playbackSpeed, currentLesson?.id, currentLesson?.accent, currentAccent, currentVolume]);

  const handleTogglePlayCurrentSentence = useCallback(() => {
    if (!currentSentence) return;
    if (playingSentenceText === currentSentence.text) {
      stopTTS();
      setPlayingSentenceText(null);
    } else {
      setPlayingSentenceText(currentSentence.text);
      handleSpeakSentence(currentSentence.text, currentSentenceIndex);
    }
  }, [currentSentence, playingSentenceText, handleSpeakSentence, currentSentenceIndex]);

  const handleNextSentenceInStudio = useCallback(() => {
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

      if (currentLesson && user?.id && !user.id.startsWith("guest")) {
        if (progressDebounceTimerRef.current) {
          clearTimeout(progressDebounceTimerRef.current);
          progressDebounceTimerRef.current = null;
        }
        const allIndices = Array.from({ length: totalSentencesCount }, (_, i) => i);
        fetch("/api/listening/progress", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user.id,
            lessonId: currentLesson.id,
            status: "COMPLETED",
            completedSentences: allIndices,
            bookmarkedSentences: savedSentenceKeys,
            timeSpent: Math.max(5, elapsedTimeRef.current),
            xpEarned: 50,
          }),
        }).catch((e) => console.error("Error saving complete progress to DB:", e));
      }
    }
  }, [currentSentenceIndex, totalSentencesCount, currentLesson, markLessonCompleted, awardXp, addToast, user?.id, savedSentenceKeys]);

  const handleSentenceCompleted = useCallback(() => {
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

    if (currentLesson && user?.id && !user.id.startsWith("guest")) {
      const completedArr = Object.keys(nextCompleted)
        .filter((k) => nextCompleted[Number(k)])
        .map(Number);
      const isCompleted = completedArr.length >= totalSentencesCount;

      if (isCompleted) {
        if (progressDebounceTimerRef.current) {
          clearTimeout(progressDebounceTimerRef.current);
          progressDebounceTimerRef.current = null;
        }
        fetch("/api/listening/progress", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user.id,
            lessonId: currentLesson.id,
            status: "COMPLETED",
            completedSentences: completedArr,
            bookmarkedSentences: savedSentenceKeys,
            timeSpent: Math.max(5, elapsedTimeRef.current),
            xpEarned: 50,
          }),
        }).catch((e) => console.error("Error saving completed progress to DB:", e));

        setTimeout(() => {
          stopTTS();
          setPlayingSentenceText(null);
          setIsLessonFinished(true);
        }, 1000);
      } else {
        // Debounced non-blocking background sync (1.2s): reduces database write load by ~80%
        if (progressDebounceTimerRef.current) {
          clearTimeout(progressDebounceTimerRef.current);
        }
        progressDebounceTimerRef.current = setTimeout(() => {
          fetch("/api/listening/progress", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId: user.id,
              lessonId: currentLesson.id,
              status: "IN_PROGRESS",
              completedSentences: completedArr,
              bookmarkedSentences: savedSentenceKeys,
              timeSpent: Math.max(5, elapsedTimeRef.current),
              xpEarned: 20,
            }),
          }).catch((e) => console.error("Error saving sentence progress to DB:", e));
        }, 1200);
      }
    } else if (currentLesson) {
      const completedArr = Object.keys(nextCompleted)
        .filter((k) => nextCompleted[Number(k)])
        .map(Number);
      if (completedArr.length >= totalSentencesCount) {
        setTimeout(() => {
          stopTTS();
          setPlayingSentenceText(null);
          setIsLessonFinished(true);
        }, 1000);
      }
    }

    if (autoNextSentence && currentSentenceIndex < totalSentencesCount - 1) {
      setTimeout(() => {
        stopTTS();
        setPlayingSentenceText(null);
        setCurrentSentenceIndex((prev) => prev + 1);
        setSentencePlaybackTime(0);
      }, 700);
    }
  }, [completedSentences, currentSentenceIndex, awardXp, addToast, currentLesson, totalSentencesCount, user?.id, savedSentenceKeys, autoNextSentence]);

  const handleAccentChange = useCallback((acc: string) => {
    setCurrentAccent(acc);
    addToast({
      type: "info",
      title: `Đã đổi giọng sang ${acc === "en-US" ? "Mỹ (US)" : acc === "en-GB" ? "Anh (UK)" : "Úc (AU)"}`,
    });
  }, [addToast]);

  const handleShuffleRecommendations = useCallback(() => {
    setIsShufflingRecommendations(true);
    setTimeout(() => {
      setLessonsList((prev) => [...prev].sort(() => 0.5 - Math.random()));
      setIsShufflingRecommendations(false);
      addToast({
        type: "info",
        title: "Đã làm mới danh sách gợi ý bài học! ↺",
      });
    }, 200);
  }, [addToast]);

  const handleWordMatched = useCallback(() => {
    awardXp(5, "dictation");
  }, [awardXp]);

  const handleResetProgress = useCallback(() => {
    setCompletedSentences({});
    addToast({
      type: "info",
      title: "Đã đặt lại tiến độ bài học! ↺",
      message: "Tiến độ học câu của bài đã được làm mới về 0%.",
    });
  }, [addToast]);

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
  if (rawIdParam || selectedLessonId) {
    if (isLoadingLessonDetail || (!currentLesson && isLoadingLessons)) {
      return <ListeningStudioSkeleton />;
    }
    // Chỉ hiển thị màn hình thông báo khi đã tải xong cả detail lẫn catalog mà vẫn không xác định được bài học
    if (!currentLesson && !isLoadingLessonDetail && !isLoadingLessons) {
      return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-4 text-2xl font-bold">
            !
          </div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
            Không tìm thấy bài nghe yêu cầu
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mb-6">
            Mã bài học không tồn tại trong hệ thống hoặc đang được cập nhật. Vui lòng chọn bài học khác từ danh mục.
          </p>
          <button
            onClick={handleBackToListing}
            className="px-5 py-2.5 rounded-xl bg-[#0059bb] hover:bg-blue-700 text-white font-medium text-sm transition-all shadow-md shadow-blue-500/20"
          >
            Quay lại danh mục bài nghe
          </button>
        </div>
      );
    }
  } else if (isLoadingLessons && !selectedLessonId) {
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
            {currentSentence ? (
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
                onAccentChange={handleAccentChange}
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
                onShuffleRecommendations={handleShuffleRecommendations}
                elapsedTime={elapsedTime}
                onElapsedTimeTick={handleElapsedTimeTick}
                formatElapsedTime={formatElapsedTime}
                onBackToListing={handleBackToListing}
                onSelectLesson={handleSelectLesson}
                onSentenceCompleted={handleSentenceCompleted}
                onWordMatched={handleWordMatched}
                onWordClick={handleWordClick}
                onTogglePlayCurrentSentence={handleTogglePlayCurrentSentence}
                onSpeakSentence={handleSpeakSentence}
                onStopTTS={stopTTS}
                onNextSentenceInStudio={handleNextSentenceInStudio}
                onResetProgress={handleResetProgress}
                onToast={addToast}
              />
            ) : (
              <ListeningStudioSkeleton />
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

function ListeningSuspenseFallback() {
  const [isStudio] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const search = window.location.search;
      return search.includes("id=") || search.includes("lessonId=");
    }
    return false;
  });

  if (isStudio) {
    return <ListeningStudioSkeleton />;
  }

  return <ListeningListingSkeleton />;
}

export default function ListeningPage() {
  return (
    <Suspense fallback={<ListeningSuspenseFallback />}>
      <ListeningPageContent />
    </Suspense>
  );
}
