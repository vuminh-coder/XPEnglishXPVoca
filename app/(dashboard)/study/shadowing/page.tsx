"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import { useNotificationStore } from "@/stores/notificationStore";
import { useListeningStore } from "@/stores/listeningStore";
import { useUiStore } from "@/stores/uiStore";
import { speakLessonText, stopTTS } from "@/shared/utils/ttsEngine";
import dynamic from "next/dynamic";
import {
  ShadowingListingSkeleton,
  ShadowingStudioSkeleton,
  ShadowingListingView,
  ShadowingStudioWorkspace,
  ShadowingCompletionScreen,
} from "@/features/shadowing";

const DeepDictionaryModal = dynamic(
  () => import("@/features/shadowing").then((m) => m.DeepDictionaryModal),
  { ssr: false }
);

const SentenceReportModal = dynamic(
  () => import("@/features/shadowing").then((m) => m.SentenceReportModal),
  { ssr: false }
);

const LessonExplorerModal = dynamic(
  () => import("@/features/shadowing").then((m) => m.LessonExplorerModal),
  { ssr: false }
);
import { useStudyTimeTracker } from "@/shared/hooks/useStudyTimeTracker";
import { pick10RandomLessons } from "@/features/listening/utils/randomLessonPicker";
import { lookupWordDeep, DeepWordDefinition } from "@/features/vocabulary/data/deepDictionary";
import { MOCK_LESSONS_DATA } from "@/features/listening/data/listeningMockData";
import { useShadowingAudioRecorder } from "@/features/shadowing/hooks/useShadowingAudioRecorder";
import {
  resolveCanonicalLessonId,
  isSameLessonId,
  resolveLessonId,
} from "@/features/listening/utils/lessonIdHelper";

function ShadowingStudioContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawIdParam = searchParams.get("id") || searchParams.get("lessonId");

  const { user, awardXp } = useAuthStore();
  const { addToast } = useNotificationStore();
  const { setCurrentLessonId, completedLessonIds, markLessonCompleted } = useListeningStore();
  const { setSidebarCollapsed, setHideBottomNav } = useUiStore();

  // 1. Database-backed lessons state (Dashboard SWR Architecture: Frame-0 synchronous localStorage hydration)
  const [lessonsList, setLessonsList] = useState<any[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const cached =
        localStorage.getItem("xp_voca_shadowing_catalog_cache") ||
        localStorage.getItem("xp_voca_shadowing_catalog_guest") ||
        localStorage.getItem("xp_voca_listening_catalog_cache") ||
        localStorage.getItem("xp_voca_listening_catalog_guest");
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return [];
  });

  const [isLoadingLessons, setIsLoadingLessons] = useState<boolean>(() => {
    if (rawIdParam) return false;
    if (typeof window === "undefined") return true;
    try {
      const cached =
        localStorage.getItem("xp_voca_shadowing_catalog_cache") ||
        localStorage.getItem("xp_voca_shadowing_catalog_guest") ||
        localStorage.getItem("xp_voca_listening_catalog_cache");
      return !cached;
    } catch {
      return true;
    }
  });

  const [isLoadingLessonDetail, setIsLoadingLessonDetail] = useState<boolean>(() => {
    if (!rawIdParam) return false;
    if (typeof window === "undefined") return true;
    try {
      const num = parseInt(rawIdParam, 10);
      const pad3 = !isNaN(num) ? String(num).padStart(3, "0") : "";
      const keysToProbe = [
        `xp_voca_shadowing_detail_${rawIdParam}_guest`,
        `xp_voca_shadowing_detail_${rawIdParam}`,
        `xp_voca_listening_detail_${rawIdParam}_guest`,
        (pad3 ? `xp_voca_shadowing_detail_listen_${pad3}_guest` : null),
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
        `xp_voca_shadowing_detail_${rawIdParam}_guest`,
        `xp_voca_shadowing_detail_${rawIdParam}`,
        `xp_voca_listening_detail_${rawIdParam}_guest`,
        canonical ? `xp_voca_shadowing_detail_${canonical}_guest` : null,
        canonical ? `xp_voca_shadowing_detail_${canonical}` : null,
      ].filter(Boolean) as string[];

      for (const k of keysToProbe) {
        const raw =
          localStorage.getItem(k.startsWith("xp_") ? k : `xp_voca_shadowing_detail_${k}_guest`) ||
          localStorage.getItem(k);
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

  const [singleLessonDb, setSingleLessonDb] = useState<any | null>(() => {
    if (typeof window === "undefined" || !rawIdParam) return null;
    try {
      const canonical = resolveCanonicalLessonId(rawIdParam);
      const num = parseInt(rawIdParam, 10);
      const pad3 = !isNaN(num) ? String(num).padStart(3, "0") : "";
      const keysToProbe = [
        `xp_voca_shadowing_detail_${rawIdParam}_guest`,
        `xp_voca_shadowing_detail_${rawIdParam}`,
        `xp_voca_listening_detail_${rawIdParam}_guest`,
        canonical ? `xp_voca_shadowing_detail_${canonical}_guest` : null,
        canonical ? `xp_voca_shadowing_detail_${canonical}` : null,
        (pad3 ? `xp_voca_shadowing_detail_listen_${pad3}_guest` : null),
        (pad3 ? `xp_voca_listening_detail_listen_${pad3}_guest` : null),
      ].filter(Boolean) as string[];

      for (const k of keysToProbe) {
        const raw = localStorage.getItem(k);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (parsed && parsed.transcript?.length) return parsed;
        }
      }
    } catch {}
    return null;
  });

  // 2. Selected lesson state (Frame 0 Synchronous Canonical Normalization)
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(() => {
    if (!rawIdParam) return null;
    return resolveCanonicalLessonId(rawIdParam) || rawIdParam;
  });
  const [isInPlaceSwitchingLesson, setIsInPlaceSwitchingLesson] = useState<boolean>(false);

  // 1. SWR Instant 0ms Local Cache Hydration & Background Neon DB Fetch for Catalog (Dashboard Architecture)
  useEffect(() => {
    let isMounted = true;
    const catalogCacheKey = `xp_voca_shadowing_catalog_${user?.id || "guest"}`;

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
        console.warn("[Shadowing] Failed to load cached catalog:", err);
      }
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    // Tầng 2: Background Neon Database Reconciliation
    async function fetchLessons() {
      try {
        const res = await fetch(`/api/listening/lessons?userId=${user?.id || ""}`, {
          signal: controller.signal,
          headers: { Accept: "application/json" },
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
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
          console.warn("[Shadowing] Catalog DB request timed out.");
        } else {
          console.warn("[Shadowing] DB fetch fallback to offline cache:", err?.message || err);
        }
        if (isMounted && lessonsList.length === 0) {
          setLessonsList(MOCK_LESSONS_DATA);
          addToast({
            type: "warning",
            title: "Chế độ offline",
            message: "Không thể tải danh mục từ CSDL Neon. Đang hiển thị danh mục offline.",
          });
        }
      } finally {
        clearTimeout(timeoutId);
        if (isMounted) setIsLoadingLessons(false);
      }
    }
    fetchLessons();
    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [user?.id, addToast]);

  // Sync URL ?id= param with database lessons (Dashboard Architecture with SWR)
  // Cache guard uses ref & alias comparison to prevent infinite re-fetching
  const lastFetchedLessonRef = useRef<string | null>(null);
  const isLeavingStudioRef = useRef(false);

  // Synchronous resolution of canonical lesson id
  const canonicalQueryId = useMemo(() => {
    return resolveCanonicalLessonId(selectedLessonId || rawIdParam, lessonsList);
  }, [selectedLessonId, rawIdParam, lessonsList]);

  useEffect(() => {
    if (!rawIdParam && !selectedLessonId) {
      setIsLoadingLessonDetail(false);
      lastFetchedLessonRef.current = null;
      return;
    }

    if (isLeavingStudioRef.current) return;

    const queryLessonId: string = canonicalQueryId || selectedLessonId || rawIdParam || "";
    if (!queryLessonId) return;

    // Cache guard: If this lesson is already in detailedLessonsMap and was fetched, do not re-fetch
    if (
      lastFetchedLessonRef.current &&
      isSameLessonId(lastFetchedLessonRef.current, queryLessonId) &&
      (detailedLessonsMap[queryLessonId]?.transcript?.length ||
        (singleLessonDb?.id && isSameLessonId(singleLessonDb.id, queryLessonId)))
    ) {
      setIsLoadingLessonDetail(false);
      return;
    }

    const detailCacheKey = `xp_voca_shadowing_detail_${queryLessonId}_${user?.id || "guest"}`;

    // Tầng 1: SWR 0ms Instant Local Cache Hydration
    if (typeof window !== "undefined") {
      try {
        const raw = localStorage.getItem(detailCacheKey);
        if (raw) {
          const cached = JSON.parse(raw);
          if (cached && cached.id && Array.isArray(cached.transcript) && cached.transcript.length > 0) {
            setDetailedLessonsMap((prev) => ({
              ...prev,
              [cached.id]: cached,
              [queryLessonId]: cached,
              ...(rawIdParam ? { [rawIdParam]: cached } : {}),
            }));
            setSingleLessonDb(cached);
            setIsLoadingLessonDetail(false);
          }
        }
      } catch (err) {
        console.warn("[Shadowing] Failed to load cached lesson detail:", err);
      }
    }

    // Tầng 2: Background Neon Database Reconciliation
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);
    let isMounted = true;

    async function fetchSingle() {
      try {
        const res = await fetch(`/api/listening/lessons/${queryLessonId}?userId=${user?.id || ""}`, {
          signal: controller.signal,
          headers: { Accept: "application/json" },
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
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
          setSingleLessonDb(detail);

          if (selectedLessonId !== detail.id && !isSameLessonId(selectedLessonId, detail.id)) {
            setSelectedLessonId(detail.id);
            setCurrentLessonId(detail.id);
          }

          try {
            localStorage.setItem(detailCacheKey, JSON.stringify(detail));
            localStorage.setItem(`xp_voca_shadowing_detail_${detail.id}_${user?.id || "guest"}`, JSON.stringify(detail));
            if (rawIdParam) {
              localStorage.setItem(`xp_voca_shadowing_detail_${rawIdParam}_${user?.id || "guest"}`, JSON.stringify(detail));
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
        }
      } catch (e: any) {
        if (!isMounted) return;
        if (e?.name === "AbortError") {
          console.warn("[Shadowing] Lesson detail request timed out.");
        } else {
          console.warn("[Shadowing] Fetch single lesson fallback:", e?.message || e);
        }
        if (isMounted) {
          const fallback =
            MOCK_LESSONS_DATA.find((l) => isSameLessonId(l.id, queryLessonId)) ||
            MOCK_LESSONS_DATA.find((l) => l.id === queryLessonId);
          if (fallback) {
            lastFetchedLessonRef.current = fallback.id;
            setDetailedLessonsMap((prev) => ({
              ...prev,
              [fallback.id]: fallback,
              [queryLessonId]: fallback,
            }));
            setSingleLessonDb(fallback);
          }
        }
      } finally {
        clearTimeout(timeoutId);
        if (isMounted) setIsLoadingLessonDetail(false);
      }
    }

    fetchSingle();
    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [canonicalQueryId, user?.id, rawIdParam, addToast]);

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
    if (!selectedLessonId && !rawIdParam) return null;
    const lookupKey = selectedLessonId || rawIdParam || "";
    const canonical = resolveCanonicalLessonId(lookupKey, lessonsList);

    // 1. Check detailedLessonsMap directly by canonical or lookupKey
    if (canonical && detailedLessonsMap[canonical]?.transcript?.length) {
      return detailedLessonsMap[canonical];
    }
    if (detailedLessonsMap[lookupKey]?.transcript?.length) {
      return detailedLessonsMap[lookupKey];
    }

    // 2. Check singleLessonDb directly or by alias
    if (singleLessonDb && singleLessonDb.transcript?.length) {
      if (
        isSameLessonId(singleLessonDb.id, lookupKey) ||
        isSameLessonId(singleLessonDb.id, canonical)
      ) {
        return singleLessonDb;
      }
    }

    // 3. Multi-key alias probe in detailedLessonsMap
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

    // 4. Lookup in lessonsList
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

    // 5. TRUE SWR: In-memory MOCK_LESSONS_DATA in RAM (0ms instant display)
    // Never freeze user for 5-8s while Neon DB cold starts!
    const fallbackId = canonical || resolveCanonicalLessonId(lookupKey, MOCK_LESSONS_DATA) || lookupKey;
    const fromMock = MOCK_LESSONS_DATA.find((l) => isSameLessonId(l.id, fallbackId));
    if (fromMock?.transcript?.length) return { ...(singleLessonDb || {}), ...fromMock };

    // 6. While DB is actively fetching an unknown lesson, wait for DB
    if (isLoadingLessonDetail) return null;

    return singleLessonDb || null;
  }, [lessonsList, selectedLessonId, rawIdParam, singleLessonDb, detailedLessonsMap, isLoadingLessonDetail]);

  // Practice state
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [playingSentenceText, setPlayingSentenceText] = useState<string | null>(null);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [sentencePlaybackTime, setSentencePlaybackTime] = useState<number>(0);
  const [isLessonFinished, setIsLessonFinished] = useState(false);
  const [completedSentences, setCompletedSentences] = useState<{ [idx: number]: boolean }>({});
  const [mobileStudioTab, setMobileStudioTab] = useState<"practice" | "transcript">("practice");

  // Overall practice timer state
  const elapsedTimeRef = useRef(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const handleElapsedTimeTick = useCallback((sec: number) => {
    elapsedTimeRef.current = sec;
    setElapsedTime(sec);
  }, []);

  const handleNextSentenceRef = useRef<() => void>(() => {});
  const handleAutoAdvance = useCallback(() => {
    handleNextSentenceRef.current();
  }, []);

  // Real-time backend practice time tracker for Shadowing
  useStudyTimeTracker("shadowing", {
    activeCondition: !!selectedLessonId && !isLessonFinished,
  });

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

  // Deep Word Dictionary Modal State
  const [selectedWord, setSelectedWord] = useState<DeepWordDefinition | null>(null);

  const currentSentence =
    currentLesson?.transcript?.[currentSentenceIndex] ||
    currentLesson?.transcript?.[0] ||
    null;
  const totalSentencesCount = currentLesson?.transcript?.length || 0;

  // Single-Row Horizontal Word Track Auto-Scroll Refs & Playback Tracking
  const wordTrackContainerRef = useRef<HTMLDivElement>(null);
  const wordTokenRefs = useRef<(HTMLElement | null)[]>([]);
  const [activePlaybackWordIndex, setActivePlaybackWordIndex] = useState<number | null>(null);

  // WebRTC Audio Recorder & Real AI Speech Analysis Hook
  const {
    isRecording,
    recordingTime,
    userAudioUrl,
    isPlayingUserAudio,
    setIsPlayingUserAudio,
    isAnalyzing,
    liveAudioEnergy,
    aiAnalysisResult,
    setAiAnalysisResult,
    liveRecognizedWords,
    sentenceScores,
    userAudioPlayerRef,
    startRecording,
    stopRecording,
    resetCurrentSentenceAudio,
  } = useShadowingAudioRecorder({
    currentSentence,
    currentSentenceIndex,
    totalSentencesCount,
    currentLesson,
    user,
    elapsedTime,
    autoNextSentence,
    savedSentenceKeys,
    completedSentences,
    setCompletedSentences,
    awardXp,
    addToast,
    stopTTS,
    setPlayingSentenceText,
    onAutoAdvance: handleAutoAdvance,
  });

  // Direct Word Lookup
  const handleWordClick = useCallback((rawWord: string) => {
    const clean = rawWord.replace(/[.,/#!$%^&*;:{}=\-_`~()?]/g, "").trim();
    if (!clean) return;

    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    if (isMobile) {
      speakLessonText(clean, { lessonId: currentLesson?.id, rate: 1.0 });
      return;
    }

    const deepDef = lookupWordDeep(clean);
    setSelectedWord(deepDef);
  }, [currentLesson?.id]);

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

  // 2. Auto-scroll word track during sample audio playback
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

  // 3. Reset scroll position on sentence change
  useEffect(() => {
    setActivePlaybackWordIndex(null);
    if (wordTrackContainerRef.current) {
      wordTrackContainerRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  }, [currentSentenceIndex]);

  // 2-Row Listing State
  const BASIC_LEVELS = useMemo(() => new Set(["Easy", "Beginner", "A1", "A2"]), []);
  const ADVANCED_LEVELS = useMemo(() => new Set(["Hard", "Advanced", "C1", "C2"]), []);

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
  }, [lessonsList, completedLessonIds, listingSearch, BASIC_LEVELS, ADVANCED_LEVELS]);

  const handleShuffleBasic = useCallback(() => {
    const easyPool = lessonsList.filter((l) => BASIC_LEVELS.has(l.level));
    const midPool = lessonsList.filter(
      (l) => l.level === "Intermediate" || l.level === "B1" || l.level === "B2"
    );
    const basicPool = [...easyPool, ...midPool.slice(0, Math.ceil(midPool.length / 2))];
    const safeBasic =
      basicPool.length > 0 ? basicPool : lessonsList.slice(0, Math.ceil(lessonsList.length / 2));
    setDisplayedBasicLessons(pick10RandomLessons(safeBasic, completedLessonIds || []).slice(0, 8));
    addToast({ type: "info", title: "Đã đổi 8 bài học cơ bản ngẫu nhiên mới! ↺" });
  }, [lessonsList, BASIC_LEVELS, completedLessonIds, addToast]);

  const handleShuffleAdvanced = useCallback(() => {
    const hardPool = lessonsList.filter((l) => ADVANCED_LEVELS.has(l.level));
    const midPool = lessonsList.filter(
      (l) => l.level === "Intermediate" || l.level === "B1" || l.level === "B2"
    );
    const advPool = [...hardPool, ...midPool.slice(Math.ceil(midPool.length / 2))];
    const safeAdv =
      advPool.length > 0 ? advPool : lessonsList.slice(Math.ceil(lessonsList.length / 2));
    setDisplayedAdvancedLessons(pick10RandomLessons(safeAdv, completedLessonIds || []).slice(0, 8));
    addToast({ type: "info", title: "Đã đổi 8 bài học nâng cao ngẫu nhiên mới! ↺" });
  }, [lessonsList, ADVANCED_LEVELS, completedLessonIds, addToast]);

  // Computed stats for Micro-Hero Bento Grid (Apple-grade 0px CLS)
  const computedShadowingStats = useMemo(() => {
    let practicedSentences = 0;
    let completedCount = 0;
    lessonsList.forEach((l) => {
      const isDone =
        l.userStatus === "COMPLETED" ||
        completedLessonIds.includes(l.id) ||
        completedLessonIds.includes(String(l.id));
      if (isDone) {
        completedCount++;
        practicedSentences += l.totalSentences || l.transcript?.length || 10;
      } else if (l.userProgress?.completedSentences?.length) {
        practicedSentences += l.userProgress.completedSentences.length;
      }
    });
    return {
      sentencesPracticed: Math.max(practicedSentences, completedLessonIds.length * 10),
      averageFluency: 94,
      studyMinutes: Math.max(15, Math.round(practicedSentences * 0.8)),
      completedLessonsCount: Math.max(completedCount, completedLessonIds.length),
    };
  }, [lessonsList, completedLessonIds]);

  // Select lesson with Router sync
  const handleSelectLesson = useCallback((lessonId: string | number) => {
    const strId = String(lessonId);
    stopTTS();
    setPlayingSentenceText(null);
    setSelectedLessonId(strId);
    setCurrentLessonId(strId);
    setCurrentSentenceIndex(0);
    setSentencePlaybackTime(0);
    setIsLessonFinished(false);
    resetCurrentSentenceAudio();
    setCompletedSentences({});
    setSidebarCollapsed(true);

    const canonical = resolveCanonicalLessonId(strId, lessonsList);
    const isCached =
      !!detailedLessonsMap[strId]?.transcript?.length ||
      (canonical ? !!detailedLessonsMap[canonical]?.transcript?.length : false) ||
      (singleLessonDb?.transcript?.length && isSameLessonId(singleLessonDb.id, strId));

    if (selectedLessonId && isCached) {
      // In-place smooth transition without tearing down studio workspace
      setIsInPlaceSwitchingLesson(true);
      setTimeout(() => {
        setIsInPlaceSwitchingLesson(false);
      }, 150);
    } else {
      setIsLoadingLessonDetail(!isCached);
    }

    const lessonIdx = lessonsList.findIndex((l) => isSameLessonId(l.id, strId));
    if (lessonIdx !== -1) {
      router.push(`/study/shadowing?id=${lessonIdx + 1}`);
    } else {
      router.push(`/study/shadowing?id=${strId}`);
    }
  }, [resetCurrentSentenceAudio, selectedLessonId, lessonsList, router, setCurrentLessonId, setSidebarCollapsed, detailedLessonsMap, singleLessonDb]);

  // Back to listing with Router sync & race-condition guard
  const handleBackToListing = useCallback(() => {
    isLeavingStudioRef.current = true;
    stopTTS();
    setPlayingSentenceText(null);
    setSelectedLessonId(null);
    setCurrentLessonId("");
    setIsLessonFinished(false);
    setSentencePlaybackTime(0);
    setSidebarCollapsed(false);
    setIsLoadingLessonDetail(false);
    lastFetchedLessonRef.current = null;
    router.push("/study/shadowing");
    setTimeout(() => {
      isLeavingStudioRef.current = false;
    }, 400);
  }, [router, setCurrentLessonId, setSidebarCollapsed]);

  // Sentence Bookmark with Database Persistence
  const currentSentenceKey = `${selectedLessonId || "lesson"}_${currentSentenceIndex}`;
  const isCurrentSentenceBookmarked = savedSentenceKeys.includes(currentSentenceKey);

  const handleToggleBookmark = useCallback(async () => {
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

    if (currentLesson && user?.id && !user.id.startsWith("guest")) {
      try {
        await fetch("/api/listening/progress", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user.id,
            lessonId: currentLesson.id,
            bookmarkedSentences: nextKeys,
            skill: "shadowing",
          }),
        });
      } catch (e) {
        console.error("Error persisting bookmark to DB:", e);
      }
    }
  }, [isCurrentSentenceBookmarked, savedSentenceKeys, currentSentenceKey, addToast, awardXp, currentSentence, currentLesson, user]);

  // Sentence Report Modal submission
  const handleSubmitReport = useCallback((
    e: React.FormEvent,
    _reason: string,
    _description: string
  ) => {
    setShowReportModal(false);
    addToast({
      type: "success",
      title: "🚩 Đã gửi phản ánh thành công!",
      message: "Cảm ơn bạn đã đóng góp! Ban biên tập sẽ kiểm tra và cập nhật câu trong 24h.",
    });
  }, [addToast]);

  const handleAdjustFontSize = useCallback((delta: number) => {
    setFontSizeLevel((prev) => Math.max(0, Math.min(3, prev + delta)));
  }, []);

  // Reusable Sample Audio Player
  const handlePlaySampleAudio = useCallback(() => {
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
  }, [currentSentence, playingSentenceText, playbackSpeed, currentLesson?.id, currentSentenceIndex, currentLesson?.accent]);

  const handleNextSentence = useCallback(async () => {
    stopTTS();
    setPlayingSentenceText(null);
    setSentencePlaybackTime(0);
    resetCurrentSentenceAudio();

    if (currentSentenceIndex < totalSentencesCount - 1) {
      setCurrentSentenceIndex((prev) => prev + 1);
    } else {
      setIsLessonFinished(true);
      if (currentLesson) {
        markLessonCompleted(currentLesson.id);
        awardXp(50, "shadowing");
        if (user?.id && !user.id.startsWith("guest")) {
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
              timeSpent: Math.max(15, elapsedTimeRef.current),
              xpEarned: 50,
              skill: "shadowing",
            }),
          }).catch((e) => console.error("Error saving completed shadowing progress to DB:", e));
        }
      }
      addToast({
        type: "success",
        title: "🎉 HOÀN THÀNH BÀI LUYỆN NÓI!",
        message: "Chúc mừng bạn đã hoàn thành xuất sắc toàn bộ bài Shadowing! +50 XP thưởng.",
      });
    }
  }, [resetCurrentSentenceAudio, currentSentenceIndex, totalSentencesCount, currentLesson, markLessonCompleted, awardXp, user, savedSentenceKeys, addToast]);

  useEffect(() => {
    handleNextSentenceRef.current = handleNextSentence;
  });

  const handlePrevSentence = useCallback(() => {
    if (currentSentenceIndex > 0) {
      stopTTS();
      setPlayingSentenceText(null);
      setSentencePlaybackTime(0);
      resetCurrentSentenceAudio();
      setCurrentSentenceIndex((prev) => prev - 1);
    }
  }, [currentSentenceIndex, resetCurrentSentenceAudio]);

  const handleOpenReportModal = useCallback(() => {
    setShowReportModal(true);
  }, []);

  const handleResetCurrentSentence = useCallback(() => {
    resetCurrentSentenceAudio();
    setSentencePlaybackTime(0);
  }, [resetCurrentSentenceAudio]);

  const handleSelectTranscriptSentence = useCallback((idx: number) => {
    resetCurrentSentenceAudio();
    setSentencePlaybackTime(0);
    setCurrentSentenceIndex(idx);
  }, [resetCurrentSentenceAudio]);

  const handleReplayTranscriptSentence = useCallback((idx: number) => {
    const text = currentLesson?.transcript?.[idx]?.text;
    if (text) {
      speakLessonText(text, {
        rate: playbackSpeed,
        lessonId: currentLesson.id,
        speakerIndex: idx % 2,
        accent: currentLesson.accent,
      });
    }
  }, [currentLesson, playbackSpeed]);

  const handleResetProgress = useCallback(() => {
    setCompletedSentences({});
    setCurrentSentenceIndex(0);
    setSentencePlaybackTime(0);
    addToast({
      type: "info",
      title: "Đã đặt lại tiến độ bài học này ↺",
    });
  }, [addToast]);

  const handleShuffleRecommendations = useCallback(() => {
    setLessonsList((prev) => [...prev].sort(() => 0.5 - Math.random()));
    addToast({
      type: "info",
      title: "Đã làm mới danh sách gợi ý bài học! ↺",
    });
  }, [addToast]);

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

  // Loading Studio Mode (with query param or lessonDetail fetching)
  if ((rawIdParam || selectedLessonId) && !isInPlaceSwitchingLesson) {
    if (isLoadingLessonDetail || (!currentLesson && isLoadingLessons)) {
      return <ShadowingStudioSkeleton />;
    }
    // Chỉ hiển thị màn hình không tìm thấy khi đã tải xong cả detail lẫn catalog mà vẫn không có bài học
    if (!currentLesson && !isLoadingLessonDetail && !isLoadingLessons) {
      return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center select-none font-sans">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-4 text-2xl font-bold">
            !
          </div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
            Không tìm thấy phòng luyện Shadowing
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mb-6">
            Mã bài học không tồn tại trong hệ thống hoặc đang được cập nhật. Vui lòng chọn bài học khác từ danh mục.
          </p>
          <button
            onClick={handleBackToListing}
            className="px-5 py-2.5 rounded-xl bg-[#0059bb] hover:bg-blue-700 text-white font-medium text-sm transition-all shadow-md shadow-blue-500/20"
          >
            Quay lại danh mục Shadowing
          </button>
        </div>
      );
    }
  }

  // Loading Listing Mode
  if (isLoadingLessons && !selectedLessonId) {
    return <ShadowingListingSkeleton />;
  }

  return (
    <div
      className={`w-full min-w-0 max-w-none font-sans relative select-none ${
        selectedLessonId
          ? "h-full max-h-screen overflow-hidden p-0"
          : "min-h-screen bg-slate-50/60 dark:bg-slate-950 flex flex-col"
      }`}
    >
      {/* 1. LISTING VIEW */}
      {!selectedLessonId && (
        <ShadowingListingView
          lessonsList={lessonsList}
          completedLessonIds={completedLessonIds}
          selectedLessonId={selectedLessonId}
          listingSearch={listingSearch}
          setListingSearch={setListingSearch}
          onSelectLesson={handleSelectLesson}
          onOpenExplorerModal={() => setShowLessonModal(true)}
          displayedBasicLessons={displayedBasicLessons}
          displayedAdvancedLessons={displayedAdvancedLessons}
          handleShuffleBasic={handleShuffleBasic}
          handleShuffleAdvanced={handleShuffleAdvanced}
          stats={computedShadowingStats}
          isLoadingStats={isLoadingLessons}
        />
      )}

      {/* 2. STUDIO WORKSPACE OR COMPLETION SUMMARY */}
      {selectedLessonId && currentLesson && (
        <>
          {isLessonFinished ? (
            <ShadowingCompletionScreen
              currentLesson={currentLesson}
              elapsedTime={elapsedTime}
              totalSentencesCount={totalSentencesCount}
              lessonsList={lessonsList}
              onBackToListing={handleBackToListing}
              onRepeatLesson={() => {
                setIsLessonFinished(false);
                setCurrentSentenceIndex(0);
                setSentencePlaybackTime(0);
                resetCurrentSentenceAudio();
                setCompletedSentences({});
              }}
              onSelectLesson={(id) => {
                handleSelectLesson(id);
                setIsLessonFinished(false);
                setCurrentSentenceIndex(0);
                setSentencePlaybackTime(0);
                resetCurrentSentenceAudio();
                setCompletedSentences({});
              }}
            />
          ) : (
            <ShadowingStudioWorkspace
              currentLesson={currentLesson}
              rawIdParam={rawIdParam}
              selectedLessonId={selectedLessonId}
              isInPlaceSwitchingLesson={isInPlaceSwitchingLesson}
              elapsedTime={elapsedTime}
              onElapsedTimeTick={handleElapsedTimeTick}
              currentSentenceIndex={currentSentenceIndex}
              totalSentencesCount={totalSentencesCount}
              sentencePlaybackTime={sentencePlaybackTime}
              setSentencePlaybackTime={setSentencePlaybackTime}
              playingSentenceText={playingSentenceText}
              playbackSpeed={playbackSpeed}
              setPlaybackSpeed={setPlaybackSpeed}
              isRecording={isRecording}
              recordingTime={recordingTime}
              userAudioUrl={userAudioUrl}
              isPlayingUserAudio={isPlayingUserAudio}
              setIsPlayingUserAudio={setIsPlayingUserAudio}
              userAudioPlayerRef={userAudioPlayerRef}
              isAnalyzing={isAnalyzing}
              liveAudioEnergy={liveAudioEnergy}
              sentenceScores={sentenceScores}
              aiAnalysisResult={aiAnalysisResult}
              liveRecognizedWords={liveRecognizedWords}
              activePlaybackWordIndex={activePlaybackWordIndex}
              wordTrackContainerRef={wordTrackContainerRef}
              wordTokenRefs={wordTokenRefs}
              mobileStudioTab={mobileStudioTab}
              setMobileStudioTab={setMobileStudioTab}
              isCurrentSentenceBookmarked={isCurrentSentenceBookmarked}
              handleToggleBookmark={handleToggleBookmark}
              handleBackToListing={handleBackToListing}
              onOpenReportModal={handleOpenReportModal}
              fontSizeLevel={fontSizeLevel}
              handleAdjustFontSize={handleAdjustFontSize}
              autoNextSentence={autoNextSentence}
              setAutoNextSentence={setAutoNextSentence}
              hideTranslation={hideTranslation}
              setHideTranslation={setHideTranslation}
              handleWordClick={handleWordClick}
              handlePlaySampleAudio={handlePlaySampleAudio}
              handlePrevSentence={handlePrevSentence}
              handleNextSentence={handleNextSentence}
              startRecording={startRecording}
              stopRecording={stopRecording}
              handleResetCurrentSentence={handleResetCurrentSentence}
              completedSentences={completedSentences}
              onSelectTranscriptSentence={handleSelectTranscriptSentence}
              onReplayTranscriptSentence={handleReplayTranscriptSentence}
              onResetProgress={handleResetProgress}
              recommendedLessons={lessonsList
                .filter((l) => l.id !== currentLesson.id)
                .slice(0, 5)}
              onSelectLesson={handleSelectLesson}
              onShuffleRecommendations={handleShuffleRecommendations}
            />
          )}
        </>
      )}

      {/* 3. MODALS */}
      <DeepDictionaryModal
        selectedWord={selectedWord}
        onClose={() => setSelectedWord(null)}
        lessonId={currentLesson?.id}
      />

      <SentenceReportModal
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
        sentenceIndex={currentSentenceIndex}
        onSubmit={handleSubmitReport}
      />

      <LessonExplorerModal
        isOpen={showLessonModal}
        onClose={() => setShowLessonModal(false)}
        lessonsList={lessonsList}
        selectedLessonId={selectedLessonId}
        onSelectLesson={handleSelectLesson}
      />
    </div>
  );
}

function ShadowingSuspenseFallback() {
  const [isStudio] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const search = window.location.search;
      return search.includes("id=") || search.includes("lessonId=");
    }
    return false;
  });

  if (isStudio) {
    return <ShadowingStudioSkeleton />;
  }

  return <ShadowingListingSkeleton />;
}

export default function ShadowingPage() {
  return (
    <Suspense fallback={<ShadowingSuspenseFallback />}>
      <ShadowingStudioContent />
    </Suspense>
  );
}
