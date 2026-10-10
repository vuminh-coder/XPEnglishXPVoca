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
  ShadowingVideoListingSkeleton,
  ShadowingVideoStudioSkeleton,
  ShadowingAudioListingSkeleton,
  ShadowingAudioStudioSkeleton,
} from "./LoadingSkeletons";
import { ShadowingListingView } from "./ShadowingListingView";
import { ShadowingStudioWorkspace } from "./ShadowingStudioWorkspace";
import { ShadowingCompletionScreen } from "./ShadowingCompletionScreen";

const DeepDictionaryModal = dynamic(
  () => import("./ShadowingModals").then((m) => m.DeepDictionaryModal),
  { ssr: false }
);

const SentenceReportModal = dynamic(
  () => import("./ShadowingModals").then((m) => m.SentenceReportModal),
  { ssr: false }
);

const LessonExplorerModal = dynamic(
  () => import("./ShadowingModals").then((m) => m.LessonExplorerModal),
  { ssr: false }
);

import { useStudyTimeTracker } from "@/shared/hooks/useStudyTimeTracker";
import { pick10RandomLessons } from "@/features/listening/utils/randomLessonPicker";
import { lookupWordDeep, DeepWordDefinition } from "@/features/vocabulary/data/deepDictionary";
import { MOCK_LESSONS_DATA } from "@/features/listening/data/listeningMockData";
import { MOCK_VIDEO_LESSONS } from "@/features/listening/data/videoCatalogMockData";
import { useShadowingAudioRecorder } from "@/features/shadowing/hooks/useShadowingAudioRecorder";
import {
  resolveCanonicalLessonId,
  isSameLessonId,
} from "@/features/listening/utils/lessonIdHelper";
import { extractYouTubeVideoId } from "@/features/listening/utils/videoUrlHelper";
import {
  resolveLessonMedia,
  buildEffectiveSentence,
} from "@/features/listening/utils/lessonMedia";
import {
  useVideoCatalogStore,
  useAudioCatalogStore,
  isEntryStale,
} from "@/stores";

export interface ShadowingPageContentProps {
  basePath?: string;
  initialMode?: "audio" | "video";
}

/**
 * Format any raw video item (from API, store cache, or mock data)
 * into the complete lesson structure needed by Shadowing workspace.
 */
export function formatVideoLessonToShadowing(rawVideo: any) {
  if (!rawVideo) return null;
  const segments = rawVideo.segments || [];
  return {
    id: rawVideo.id,
    slug: rawVideo.slug,
    title: rawVideo.title,
    description: rawVideo.description,
    level: rawVideo.cefrLevel || rawVideo.level || "B1",
    audioUrl: rawVideo.audioUrl || (rawVideo.externalId ? `https://www.youtube.com/watch?v=${rawVideo.externalId}` : ""),
    youtubeUrl: rawVideo.externalId ? `https://www.youtube.com/watch?v=${rawVideo.externalId}` : "",
    duration: rawVideo.durationSeconds || rawVideo.duration || 180,
    category: typeof rawVideo.category === "object" ? rawVideo.category?.name : (rawVideo.category || rawVideo.categoryName || "Tiếng Anh"),
    imageUrl: rawVideo.thumbnailUrl || rawVideo.imageUrl,
    thumbnailUrl: rawVideo.thumbnailUrl || rawVideo.imageUrl,
    totalSentences: segments.length || rawVideo.totalSentences || 0,
    transcript: segments.map((seg: any, idx: number) => ({
      id: seg.id || `seg_${idx + 1}`,
      startTime: seg.startTime,
      endTime: seg.endTime,
      duration: seg.duration || (seg.endTime - seg.startTime),
      text: seg.text,
      ipaUs: seg.ipaUs || "",
      ipaUk: seg.ipaUk || "",
      ipa: seg.ipaUs || seg.ipaUk || "",
      translationVi: seg.translationVi || "",
      vietnamese: seg.translationVi || "",
      translation: seg.translationVi || "",
      explanationVi: seg.explanationAi || seg.explanationVi || "",
      properNouns: seg.properNouns || [],
      keywords: seg.keywords || [],
    })),
    videoMetadata: {
      sourceType: rawVideo.sourceType || "YOUTUBE",
      externalId: rawVideo.externalId,
      thumbnailUrl: rawVideo.thumbnailUrl || rawVideo.imageUrl,
      supportedTypes: rawVideo.supportedTypes,
      cefrLevel: rawVideo.cefrLevel || rawVideo.level,
      wpmSpeed: rawVideo.wpmSpeed,
    },
    accent: rawVideo.accent,
  };
}

export function ShadowingPageContent({
  basePath = "/study/shadowing/audio",
  initialMode = "audio",
}: ShadowingPageContentProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawIdParam = searchParams.get("id") || searchParams.get("lessonId");

  const user = useAuthStore((s) => s.user);
  const awardXp = useAuthStore((s) => s.awardXp);
  const addToast = useNotificationStore((s) => s.addToast);
  const setCurrentLessonId = useListeningStore((s) => s.setCurrentLessonId);
  const markLessonCompleted = useListeningStore((s) => s.markLessonCompleted);
  const completedLessonIds = useListeningStore((s) => s.completedLessonIds);
  const setSidebarCollapsed = useUiStore((s) => s.setSidebarCollapsed);
  const setHideBottomNav = useUiStore((s) => s.setHideBottomNav);

  // Hydration guard to eliminate SSR-client mismatches (0px CLS, zero hydration error)
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Global Audio SWR & Zustand Store hooks
  const cachedAudioLessons = useAudioCatalogStore((s) => s.audioLessons);
  const isAudioLessonsLoading = useAudioCatalogStore((s) => s.isAudioLessonsLoading);
  const audioFilters = useAudioCatalogStore((s) => s.filters);
  const setAudioListingSearch = useAudioCatalogStore((s) => s.setListingSearch);
  const setAudioShuffleBasic = useAudioCatalogStore((s) => s.setShuffleSeedBasic);
  const setAudioShuffleAdvanced = useAudioCatalogStore((s) => s.setShuffleSeedAdvanced);

  const listingSearch = audioFilters.listingSearch;
  const shuffleSeedBasic = audioFilters.shuffleSeedBasic;
  const shuffleSeedAdvanced = audioFilters.shuffleSeedAdvanced;
  const setListingSearch = setAudioListingSearch;

  // Frame 0 Synchronous Canonical ID Normalization
  const initialLessonId = useMemo(() => {
    if (!rawIdParam) return null;
    return resolveCanonicalLessonId(rawIdParam) || rawIdParam;
  }, [rawIdParam]);

  const isVideoRequested = Boolean(
    initialMode === "video" ||
    (rawIdParam && (
      rawIdParam.startsWith("vid_") ||
      rawIdParam.startsWith("yt_") ||
      rawIdParam.startsWith("video_") ||
      MOCK_VIDEO_LESSONS.some((v) => v.id === rawIdParam || v.slug === rawIdParam || v.externalId === rawIdParam)
    ))
  );

  // Synchronous Frame-0 initial lesson detail probe
  const initialCachedLessonDetail = useMemo(() => {
    if (!rawIdParam) return null;
    const lookup = initialLessonId || rawIdParam;

    if (isVideoRequested) {
      // 1. In-memory videoCatalogStore cache
      const cachedVideo = useVideoCatalogStore.getState().lessonDetailCache[lookup]?.data
        || useVideoCatalogStore.getState().lessonDetailCache[rawIdParam]?.data;
      if (cachedVideo) {
        return formatVideoLessonToShadowing(cachedVideo);
      }
      // 2. In-memory mock video
      const mockVideo = MOCK_VIDEO_LESSONS.find(
        (v) => v.id === lookup || v.slug === lookup || v.externalId === lookup || v.id === rawIdParam
      );
      if (mockVideo) {
        return formatVideoLessonToShadowing(mockVideo);
      }
    } else {
      // 1. In-memory audioCatalogStore cache
      const cachedAudio = useAudioCatalogStore.getState().audioDetailCache[lookup]?.data
        || useAudioCatalogStore.getState().audioDetailCache[rawIdParam]?.data;
      if (cachedAudio) {
        return cachedAudio;
      }
      // 1b. Check localStorage for audio detail
      if (typeof window !== "undefined") {
        try {
          const raw =
            localStorage.getItem(`xp_voca_audio_detail_${lookup}`) ||
            localStorage.getItem(`xp_voca_audio_detail_${rawIdParam}`);
          if (raw) {
            const parsed = JSON.parse(raw);
            if (parsed && Array.isArray(parsed.transcript) && parsed.transcript.length > 0) {
              return parsed;
            }
          }
        } catch {}
      }
      // 2. In-memory mock audio
      const mockAudio = MOCK_LESSONS_DATA.find(
        (l) => isSameLessonId(l.id, lookup) || isSameLessonId(l.id, rawIdParam)
      );
      if (mockAudio) {
        return mockAudio;
      }
    }
    return null;
  }, [rawIdParam, initialLessonId, isVideoRequested]);

  // Lessons list with Frame 0 store read & localStorage fallback (0ms Instant Catalog)
  const [lessonsList, setLessonsList] = useState<any[]>(() => {
    if (initialMode === "audio") {
      if (cachedAudioLessons && cachedAudioLessons.length > 0) {
        return cachedAudioLessons;
      }
      if (typeof window !== "undefined") {
        try {
          const raw = localStorage.getItem("xp_voca_listening_catalog_audio");
          if (raw) {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed) && parsed.length > 0) return parsed;
          }
        } catch {}
      }
      return MOCK_LESSONS_DATA.filter(
        (l: any) =>
          !l.isVideo &&
          !l.id?.startsWith("vid_") &&
          !l.audioUrl?.includes("youtube") &&
          !l.audioUrl?.includes("youtu.be")
      );
    }
    return [];
  });

  useEffect(() => {
    if (initialMode === "audio" && cachedAudioLessons && cachedAudioLessons.length > 0) {
      setLessonsList(cachedAudioLessons);
    }
  }, [cachedAudioLessons, initialMode]);

  const isLoadingLessons = initialMode === "audio"
    ? isAudioLessonsLoading && lessonsList.length === 0
    : false;

  const [isLoadingLessonDetail, setIsLoadingLessonDetail] = useState<boolean>(() =>
    Boolean(rawIdParam && !initialCachedLessonDetail)
  );

  const [detailedLessonsMap, setDetailedLessonsMap] = useState<Record<string, any>>(() => {
    if (initialCachedLessonDetail && initialCachedLessonDetail.id) {
      return {
        [initialCachedLessonDetail.id]: initialCachedLessonDetail,
        ...(rawIdParam ? { [rawIdParam]: initialCachedLessonDetail } : {}),
        ...(initialLessonId ? { [initialLessonId]: initialCachedLessonDetail } : {}),
      };
    }
    return {};
  });

  const [singleLessonDb, setSingleLessonDb] = useState<any | null>(() => initialCachedLessonDetail || null);

  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(() => {
    if (!rawIdParam) return null;
    return initialLessonId || rawIdParam;
  });
  const [isInPlaceSwitchingLesson, setIsInPlaceSwitchingLesson] = useState<boolean>(false);

  // Sync client persistent preferences safely after mount
  const [currentVolume, setCurrentVolume] = useState<number>(1.0);
  useEffect(() => {
    try {
      const volRaw = localStorage.getItem("xp_listening_volume");
      if (volRaw) setCurrentVolume(parseFloat(volRaw));
    } catch {}
  }, []);

  // 1. SWR Instant 0ms Local Cache Hydration & Background Fetch for Catalog
  useEffect(() => {
    if (initialMode === "audio") {
      useAudioCatalogStore.getState().fetchAudioLessons({ userId: user?.id, mode: "audio" });
    } else if (initialMode === "video") {
      useVideoCatalogStore.getState().fetchCategories();
      useVideoCatalogStore.getState().fetchLessons();
    }
  }, [initialMode, user?.id]);

  // Sync URL ?id= param with database lessons (Dashboard Architecture with SWR)
  const lastFetchedLessonRef = useRef<string | null>(null);
  const isLeavingStudioRef = useRef(false);

  // Synchronous resolution of canonical lesson id
  const canonicalQueryId = useMemo(() => {
    return resolveCanonicalLessonId(selectedLessonId || rawIdParam, lessonsList);
  }, [selectedLessonId, rawIdParam, lessonsList]);

  // 2. SWR Lesson Detail Fetch via Store
  /* eslint-disable react-hooks/set-state-in-effect -- SWR single lesson hydration */
  useEffect(() => {
    if (!rawIdParam && !selectedLessonId) {
      setIsLoadingLessonDetail(false);
      lastFetchedLessonRef.current = null;
      return;
    }

    if (isLeavingStudioRef.current) return;

    const queryLessonId: string = canonicalQueryId || selectedLessonId || rawIdParam || "";
    if (!queryLessonId) return;

    const isVideo =
      initialMode === "video" ||
      queryLessonId.startsWith("vid_") ||
      queryLessonId.startsWith("yt_") ||
      queryLessonId.startsWith("video_") ||
      MOCK_VIDEO_LESSONS.some((v) => v.id === queryLessonId || v.slug === queryLessonId || v.externalId === queryLessonId);

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

    let isMounted = true;

    async function syncLessonDetail() {
      try {
        if (isVideo) {
          // Video lesson SWR
          const rawDetail = await useVideoCatalogStore.getState().fetchLessonDetail(queryLessonId);
          if (!isMounted) return;
          if (rawDetail) {
            const formatted = formatVideoLessonToShadowing(rawDetail);
            if (formatted) {
              lastFetchedLessonRef.current = formatted.id;
              setDetailedLessonsMap((prev) => ({
                ...prev,
                [formatted.id]: formatted,
                [queryLessonId]: formatted,
                ...(rawIdParam ? { [rawIdParam]: formatted } : {}),
              }));
              setSingleLessonDb(formatted);
              if (selectedLessonId !== formatted.id && !isSameLessonId(selectedLessonId, formatted.id)) {
                setSelectedLessonId(formatted.id);
                setCurrentLessonId(formatted.id);
              }
            }
          }
        } else {
          // Audio lesson SWR
          const detail = await useAudioCatalogStore.getState().fetchAudioLessonDetail(queryLessonId, {
            userId: user?.id,
          });
          if (!isMounted) return;
          if (detail) {
            lastFetchedLessonRef.current = detail.id;
            setDetailedLessonsMap((prev) => {
              const next: Record<string, any> = {
                ...prev,
                [detail.id]: detail,
                [queryLessonId]: detail,
              };
              if (rawIdParam) next[rawIdParam] = detail;
              return next;
            });
            setSingleLessonDb(detail);
            if (selectedLessonId !== detail.id && !isSameLessonId(selectedLessonId, detail.id)) {
              setSelectedLessonId(detail.id);
              setCurrentLessonId(detail.id);
            }
          }
        }
      } catch (err) {
        console.warn("[Shadowing] Lesson detail sync fallback:", err);
      } finally {
        if (isMounted) {
          setIsLoadingLessonDetail(false);
        }
      }
    }

    syncLessonDetail();

    return () => {
      isMounted = false;
    };
  }, [canonicalQueryId, selectedLessonId, rawIdParam, initialMode, user?.id, setCurrentLessonId, detailedLessonsMap, singleLessonDb]);
  /* eslint-enable react-hooks/set-state-in-effect */

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
    const isNumericLookup = /^\d+$/.test(lookupKey) || /^(?:listen|lesson|toeic|ielts)[\w-]*?_?\d+$/i.test(lookupKey);
    if (isNumericLookup) {
      const num = parseInt(lookupKey.replace(/\D/g, "") || lookupKey, 10);
      if (!isNaN(num)) {
        const pad3 = String(num).padStart(3, "0");
        if (detailedLessonsMap[pad3]?.transcript?.length) return detailedLessonsMap[pad3];
        if (detailedLessonsMap[`listen_${pad3}`]?.transcript?.length) return detailedLessonsMap[`listen_${pad3}`];
        if (detailedLessonsMap[String(num)]?.transcript?.length) return detailedLessonsMap[String(num)];
      }
    }

    for (const val of Object.values(detailedLessonsMap)) {
      if (val && (isSameLessonId(val.id, lookupKey) || isSameLessonId(val.id, canonical))) {
        if (val.transcript?.length) return val;
      }
    }

    // 4. In-memory store cache read
    const cachedVideo = useVideoCatalogStore.getState().lessonDetailCache[lookupKey]?.data
      || (canonical ? useVideoCatalogStore.getState().lessonDetailCache[canonical]?.data : null);
    if (cachedVideo) {
      const formatted = formatVideoLessonToShadowing(cachedVideo);
      if (formatted?.transcript?.length) return formatted;
    }

    const cachedAudio = useAudioCatalogStore.getState().audioDetailCache[lookupKey]?.data
      || (canonical ? useAudioCatalogStore.getState().audioDetailCache[canonical]?.data : null);
    if (cachedAudio?.transcript?.length) {
      return cachedAudio;
    }

    // 5. Lookup in lessonsList
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

    // 6. TRUE SWR: In-memory MOCK_LESSONS_DATA in RAM (0ms instant display)
    const fallbackId = canonical || resolveCanonicalLessonId(lookupKey, MOCK_LESSONS_DATA) || lookupKey;
    const fromMock = MOCK_LESSONS_DATA.find((l) => isSameLessonId(l.id, fallbackId));
    if (fromMock?.transcript?.length) return { ...(singleLessonDb || {}), ...fromMock };

    // 6b. Video lesson mock fallback (by id, slug, or externalId)
    const fromVideoMock = MOCK_VIDEO_LESSONS.find(
      (v) => v.id === lookupKey || v.slug === lookupKey || v.externalId === lookupKey
    );
    if (fromVideoMock?.segments?.length) {
      return formatVideoLessonToShadowing(fromVideoMock);
    }

    // 7. While DB is actively fetching an unknown lesson, wait for DB
    if (isLoadingLessonDetail) return null;

    return singleLessonDb || null;
  }, [lessonsList, selectedLessonId, rawIdParam, singleLessonDb, detailedLessonsMap, isLoadingLessonDetail]);

  // Dynamic page title synchronization
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (currentLesson?.title) {
      document.title = `${currentLesson.title} - Luyện Nói Nhại Âm (Shadowing) | XP English`;
    } else {
      document.title = "Luyện Nói Nhại Âm (Shadowing) | XP English";
    }
  }, [currentLesson?.title]);

  // Practice state
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [playingSentenceText, setPlayingSentenceText] = useState<string | null>(null);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [sentencePlaybackTime, setSentencePlaybackTime] = useState<number>(0);
  const [isLessonFinished, setIsLessonFinished] = useState(false);
  const [completedSentences, setCompletedSentences] = useState<{ [idx: number]: boolean }>({});
  const [mobileStudioTab, setMobileStudioTab] = useState<"practice" | "transcript">("practice");

  const handleVolumeChange = useCallback((vol: number) => {
    const safeVol = Math.max(0, Math.min(1, vol));
    setCurrentVolume(safeVol);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("xp_listening_volume", String(safeVol));
      } catch {}
    }
  }, []);

  const [currentAccent, setCurrentAccent] = useState<string>("en-US");
  const handleAccentChange = useCallback((acc: string) => {
    setCurrentAccent(acc);
    addToast({
      type: "info",
      title: `Đã đổi giọng sang ${acc === "en-US" ? "Mỹ (US)" : acc === "en-GB" ? "Anh (UK)" : "Úc (AU)"}`,
    });
  }, [addToast]);

  const [mediaDisplayMode, setMediaDisplayMode] = useState<"video" | "audio">("video");
  const [isMergedWithNext, setIsMergedWithNext] = useState<boolean>(false);

  // Auto reset sentence merge on sentence change or lesson change
  useEffect(() => {
    setIsMergedWithNext(false);
  }, [currentSentenceIndex, currentLesson?.id]);

  // Overall practice timer state
  const elapsedTimeRef = useRef(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const handleElapsedTimeTick = useCallback((sec: number) => {
    elapsedTimeRef.current = sec;
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
  /* eslint-disable react-hooks/set-state-in-effect -- Hydrating user progress on lesson change */
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
  /* eslint-enable react-hooks/set-state-in-effect */

  // Custom Lesson Selection Modal & Search
  const [showLessonModal, setShowLessonModal] = useState(false);

  // Sentence Report Modal State
  const [showReportModal, setShowReportModal] = useState(false);

  // Deep Word Dictionary Modal State
  const [selectedWord, setSelectedWord] = useState<DeepWordDefinition | null>(null);

  const rawSentence =
    currentLesson?.transcript?.[currentSentenceIndex] ||
    currentLesson?.transcript?.[0] ||
    null;
  const nextSentence =
    currentLesson?.transcript?.[currentSentenceIndex + 1] || null;

  const currentSentence = useMemo(() => {
    return buildEffectiveSentence(rawSentence, nextSentence, isMergedWithNext);
  }, [rawSentence, nextSentence, isMergedWithNext]);

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
    liveRecognizedWords,
    liveWordStatuses,
    activeSpeechWordIndex,
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

  // Auto-scroll is cleanly managed inside ShadowingStudioWorkspace via activeSpeechWordIndex & activePlaybackWordIndex

  // 3. Reset scroll position on sentence change
  /* eslint-disable react-hooks/set-state-in-effect -- Reset active word on sentence index change */
  useEffect(() => {
    setActivePlaybackWordIndex(null);
    if (wordTrackContainerRef.current) {
      wordTrackContainerRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  }, [currentSentenceIndex]);
  /* eslint-enable react-hooks/set-state-in-effect */

  // 2-Row Listing State
  const BASIC_LEVELS = useMemo(() => new Set(["Easy", "Beginner", "A1", "A2"]), []);
  const ADVANCED_LEVELS = useMemo(() => new Set(["Hard", "Advanced", "C1", "C2"]), []);

  // Stabilize completedLessonIds key to prevent unnecessary re-computations
  const completedLessonIdsKey = useMemo(() => {
    return Array.isArray(completedLessonIds) ? completedLessonIds.join(",") : "";
  }, [completedLessonIds]);

  const displayedBasicLessons = useMemo(() => {
    const easyPool = lessonsList.filter((l) => BASIC_LEVELS.has(l.level));
    const midPool = lessonsList.filter(
      (l) => l.level === "Intermediate" || l.level === "B1" || l.level === "B2"
    );
    const midHalf = Math.ceil(midPool.length / 2);

    const basicPool = [...easyPool, ...midPool.slice(0, midHalf)];
    const safeBasic =
      basicPool.length > 0 ? basicPool : lessonsList.slice(0, Math.ceil(lessonsList.length / 2));

    if (listingSearch.trim()) {
      const q = listingSearch.toLowerCase();
      return safeBasic
        .filter((l) => l.title.toLowerCase().includes(q) || l.category?.toLowerCase().includes(q))
        .slice(0, 8);
    }
    return pick10RandomLessons(safeBasic, completedLessonIds || []).slice(0, 8);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessonsList, completedLessonIdsKey, listingSearch, BASIC_LEVELS, shuffleSeedBasic]);

  const displayedAdvancedLessons = useMemo(() => {
    const hardPool = lessonsList.filter((l) => ADVANCED_LEVELS.has(l.level));
    const midPool = lessonsList.filter(
      (l) => l.level === "Intermediate" || l.level === "B1" || l.level === "B2"
    );
    const advPool = [...hardPool, ...midPool.slice(Math.ceil(midPool.length / 2))];
    const safeAdv =
      advPool.length > 0 ? advPool : lessonsList.slice(Math.ceil(lessonsList.length / 2));

    if (listingSearch.trim()) {
      const q = listingSearch.toLowerCase();
      return safeAdv
        .filter((l) => l.title.toLowerCase().includes(q) || l.category?.toLowerCase().includes(q))
        .slice(0, 8);
    }
    return pick10RandomLessons(safeAdv, completedLessonIds || []).slice(0, 8);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessonsList, completedLessonIdsKey, listingSearch, ADVANCED_LEVELS, shuffleSeedAdvanced]);

  const handleShuffleBasic = useCallback(() => {
    setAudioShuffleBasic((prev) => prev + 1);
    addToast({ type: "info", title: "Đã đổi 8 bài học cơ bản ngẫu nhiên mới!" });
  }, [setAudioShuffleBasic, addToast]);

  const handleShuffleAdvanced = useCallback(() => {
    setAudioShuffleAdvanced((prev) => prev + 1);
    addToast({ type: "info", title: "Đã đổi 8 bài học nâng cao ngẫu nhiên mới!" });
  }, [setAudioShuffleAdvanced, addToast]);

  // Computed stats for Micro-Hero Bento Grid
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

  // Select lesson with Router sync (Distinguishing Audio and Video branch paths)
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

    const isVideo =
      strId.startsWith("vid_") ||
      strId.startsWith("yt_") ||
      strId.startsWith("video_") ||
      MOCK_VIDEO_LESSONS.some((v) => v.id === strId || v.slug === strId || v.externalId === strId);

    const canonical = resolveCanonicalLessonId(strId, lessonsList);
    const isCached =
      !!detailedLessonsMap[strId]?.transcript?.length ||
      (canonical ? !!detailedLessonsMap[canonical]?.transcript?.length : false) ||
      (singleLessonDb?.transcript?.length && isSameLessonId(singleLessonDb.id, strId)) ||
      Boolean(useVideoCatalogStore.getState().lessonDetailCache[strId]?.data) ||
      Boolean(useAudioCatalogStore.getState().audioDetailCache[strId]?.data) ||
      (isVideo && MOCK_VIDEO_LESSONS.some((v) => v.id === strId || v.slug === strId || v.externalId === strId)) ||
      (!isVideo && MOCK_LESSONS_DATA.some((l) => isSameLessonId(l.id, strId)));

    if (isVideo) {
      const storeVideo = useVideoCatalogStore.getState().lessonDetailCache[strId]?.data
        || MOCK_VIDEO_LESSONS.find((v) => v.id === strId || v.slug === strId || v.externalId === strId);
      if (storeVideo) {
        const formatted = formatVideoLessonToShadowing(storeVideo);
        if (formatted) {
          setDetailedLessonsMap((prev) => ({
            ...prev,
            [formatted.id]: formatted,
            [strId]: formatted,
          }));
          setSingleLessonDb(formatted);
        }
      }
    } else {
      const storeAudio = useAudioCatalogStore.getState().audioDetailCache[strId]?.data
        || (canonical ? useAudioCatalogStore.getState().audioDetailCache[canonical]?.data : null)
        || MOCK_LESSONS_DATA.find((l) => isSameLessonId(l.id, strId) || (canonical && isSameLessonId(l.id, canonical)));
      if (storeAudio) {
        const lessonIdx = lessonsList.findIndex((l) => isSameLessonId(l.id, strId));
        const numId = lessonIdx !== -1 ? String(lessonIdx + 1) : null;
        setDetailedLessonsMap((prev) => ({
          ...prev,
          [storeAudio.id]: storeAudio,
          [strId]: storeAudio,
          ...(canonical ? { [canonical]: storeAudio } : {}),
          ...(numId ? { [numId]: storeAudio } : {}),
        }));
        setSingleLessonDb(storeAudio);
      }
    }

    if (isCached) {
      setIsInPlaceSwitchingLesson(true);
      setIsLoadingLessonDetail(false);
      setTimeout(() => {
        setIsInPlaceSwitchingLesson(false);
      }, 150);
    } else {
      setIsLoadingLessonDetail(true);
    }

    const targetRoute =
      initialMode === "video" || (!basePath.includes("/audio") && isVideo)
        ? "/study/shadowing/video"
        : basePath;
    const lessonIdx = lessonsList.findIndex((l) => isSameLessonId(l.id, strId));
    if (lessonIdx !== -1 && !isVideo) {
      router.push(`${targetRoute}?id=${lessonIdx + 1}`);
    } else {
      router.push(`${targetRoute}?id=${strId}`);
    }
  }, [resetCurrentSentenceAudio, selectedLessonId, lessonsList, router, setCurrentLessonId, setSidebarCollapsed, detailedLessonsMap, singleLessonDb, initialMode, basePath]);

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
    router.push(basePath);
    setTimeout(() => {
      isLeavingStudioRef.current = false;
    }, 400);
  }, [router, basePath, setCurrentLessonId, setSidebarCollapsed]);

  // Sentence Bookmark with Database Persistence
  const currentSentenceKey = `${selectedLessonId || "lesson"}_${currentSentenceIndex}`;
  const isCurrentSentenceBookmarked = savedSentenceKeys.includes(currentSentenceKey);

  const handleToggleBookmark = useCallback(async () => {
    let nextKeys: string[];
    if (isCurrentSentenceBookmarked) {
      nextKeys = savedSentenceKeys.filter((k) => k !== currentSentenceKey);
      addToast({ type: "info", title: "Đã bỏ lưu câu khỏi sổ tay!" });
    } else {
      nextKeys = [...savedSentenceKeys, currentSentenceKey];
      awardXp(5, "shadowing");
      addToast({
        type: "success",
        title: "Đã lưu câu vào sổ tay luyện nói! (+5 XP)",
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
  const handleSubmitReport = useCallback(() => {
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
      const mediaInfo = resolveLessonMedia(currentLesson);
      if (!mediaInfo.isVideoLesson || mediaDisplayMode === "audio") {
        speakLessonText(currentSentence.text, {
          rate: playbackSpeed,
          lessonId: currentLesson?.id,
          speakerIndex: currentSentenceIndex % 2,
          accent: currentAccent || currentLesson?.accent,
          volume: currentVolume,
          onWordBoundary: (_charIndex, wordIdx) => {
            setActivePlaybackWordIndex(wordIdx);
          },
          onEnd: () => {
            setPlayingSentenceText(null);
            setActivePlaybackWordIndex(null);
            setSentencePlaybackTime(0);
          },
        });
      }
    }
  }, [
    currentSentence,
    playingSentenceText,
    playbackSpeed,
    currentLesson,
    currentSentenceIndex,
    currentAccent,
    currentVolume,
    mediaDisplayMode,
  ]);

  const handleNextSentence = useCallback(async () => {
    stopTTS();
    setPlayingSentenceText(null);
    setSentencePlaybackTime(0);
    resetCurrentSentenceAudio();

    if (currentSentenceIndex < totalSentencesCount - 1) {
      setCurrentSentenceIndex((prev) => prev + 1);
    } else {
      setElapsedTime(elapsedTimeRef.current);
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
        title: "Hoàn thành bài luyện nói!",
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
    stopTTS();
    setPlayingSentenceText(null);
    setCurrentSentenceIndex(idx);
    setSentencePlaybackTime(0);
    resetCurrentSentenceAudio();
    const targetS = currentLesson?.transcript?.[idx];
    if (targetS?.text) {
      setPlayingSentenceText(targetS.text);
      const mediaInfo = resolveLessonMedia(currentLesson);
      if (!mediaInfo.isVideoLesson || mediaDisplayMode === "audio") {
        speakLessonText(targetS.text, {
          rate: playbackSpeed,
          lessonId: currentLesson?.id,
          speakerIndex: idx % 2,
          accent: currentAccent || currentLesson?.accent,
          volume: currentVolume,
          onWordBoundary: (_charIndex, wordIdx) => {
            setActivePlaybackWordIndex(wordIdx);
          },
          onEnd: () => {
            setPlayingSentenceText(null);
            setActivePlaybackWordIndex(null);
            setSentencePlaybackTime(0);
          },
        });
      }
    }
  }, [
    currentLesson,
    playbackSpeed,
    currentAccent,
    currentVolume,
    mediaDisplayMode,
    resetCurrentSentenceAudio,
  ]);

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
      } else if (e.code === "ArrowLeft") {
        e.preventDefault();
        setSentencePlaybackTime((prev) => Math.max(0, prev - 5));
        addToast({ type: "info", title: "Tua lùi 5s" });
      } else if (e.code === "ArrowRight") {
        e.preventDefault();
        setSentencePlaybackTime((prev) => prev + 5);
        addToast({ type: "info", title: "Tua nhanh 5s" });
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
    handleNextSentence,
    handlePlaySampleAudio,
    isRecording,
    startRecording,
    stopRecording,
    addToast,
  ]);

  // Detect whether current session is a video lesson
  const isCurrentLessonVideo = useMemo(() => {
    if (initialMode === "audio" || basePath.includes("/audio")) return false;
    if (currentLesson) {
      const media = resolveLessonMedia(currentLesson);
      return (
        media.isVideoLesson ||
        (currentLesson as any)?.videoMetadata?.sourceType === "YOUTUBE" ||
        (currentLesson as any)?.sourceType === "YOUTUBE" ||
        Boolean(extractYouTubeVideoId(currentLesson.audioUrl || ""))
      );
    }
    const key = rawIdParam || selectedLessonId;
    if (!key) return initialMode === "video";
    return (
      initialMode === "video" ||
      key.startsWith("vid_") ||
      key.startsWith("yt_") ||
      key.startsWith("video_") ||
      MOCK_VIDEO_LESSONS.some((v) => v.id === key || v.slug === key || v.externalId === key)
    );
  }, [currentLesson, rawIdParam, selectedLessonId, initialMode, basePath]);

  // Hydration guard to eliminate SSR-client mismatches (Exact 0px CLS Twin)
  if (!hasMounted) {
    if (rawIdParam || selectedLessonId) {
      return isCurrentLessonVideo ? <ShadowingVideoStudioSkeleton /> : <ShadowingStudioSkeleton />;
    }
    return initialMode === "video" ? <ShadowingVideoListingSkeleton /> : <ShadowingListingSkeleton />;
  }

  // Loading Studio Mode (with query param or lessonDetail fetching)
  if ((rawIdParam || selectedLessonId) && !isInPlaceSwitchingLesson) {
    if (!currentLesson && (isLoadingLessonDetail || isLoadingLessons)) {
      return isCurrentLessonVideo ? <ShadowingVideoStudioSkeleton /> : <ShadowingStudioSkeleton />;
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
  if (isLoadingLessons && !selectedLessonId && initialMode !== "video") {
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
          activeHubMode={initialMode}
          basePath={basePath}
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
              liveWordStatuses={liveWordStatuses}
              activeSpeechWordIndex={activeSpeechWordIndex}
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
                .filter((l) => {
                  if (l.id === currentLesson.id) return false;
                  if (initialMode === "audio" || basePath.includes("/audio")) {
                    const isVid =
                      Boolean(l.isVideo) ||
                      String(l.id).startsWith("vid_") ||
                      String(l.id).startsWith("yt_") ||
                      String(l.id).startsWith("video_") ||
                      Boolean(l.audioUrl?.includes("youtube")) ||
                      Boolean(l.audioUrl?.includes("youtu.be"));
                    return !isVid;
                  }
                  return true;
                })
                .slice(0, 5)}
              onSelectLesson={handleSelectLesson}
              onShuffleRecommendations={handleShuffleRecommendations}
              setPlayingSentenceText={setPlayingSentenceText}
              currentVolume={currentVolume}
              setCurrentVolume={handleVolumeChange}
              currentAccent={currentAccent}
              onAccentChange={handleAccentChange}
              mediaDisplayMode={mediaDisplayMode}
              onMediaDisplayModeChange={setMediaDisplayMode}
              isMergedWithNext={isMergedWithNext}
              onToggleMergeNext={() => setIsMergedWithNext((prev) => !prev)}
              onToast={addToast}
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

export function ShadowingAudioSuspenseFallback() {
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

  return <ShadowingAudioListingSkeleton />;
}

export function ShadowingVideoSuspenseFallback() {
  const [isStudio] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const search = window.location.search;
      return search.includes("id=") || search.includes("lessonId=");
    }
    return false;
  });

  if (isStudio) {
    return <ShadowingVideoStudioSkeleton />;
  }

  return <ShadowingVideoListingSkeleton />;
}

export function ShadowingSuspenseFallback() {
  const [mode] = useState<{ isStudio: boolean; isVideo: boolean }>(() => {
    if (typeof window !== "undefined") {
      const search = window.location.search;
      const isStudio = search.includes("id=") || search.includes("lessonId=");
      const isVideo =
        window.location.pathname.includes("/video") ||
        (!window.location.pathname.includes("/audio") &&
          (search.includes("vid_") ||
            search.includes("yt_") ||
            search.includes("video_")));
      return { isStudio, isVideo };
    }
    return { isStudio: false, isVideo: false };
  });

  if (mode.isStudio) {
    return mode.isVideo ? <ShadowingVideoStudioSkeleton /> : <ShadowingStudioSkeleton />;
  }

  return mode.isVideo ? <ShadowingVideoListingSkeleton /> : <ShadowingListingSkeleton />;
}

export default function ShadowingPage({
  basePath = "/study/shadowing",
}: ShadowingPageContentProps) {
  return (
    <Suspense fallback={<ShadowingSuspenseFallback />}>
      <ShadowingPageContent basePath={basePath} />
    </Suspense>
  );
}
