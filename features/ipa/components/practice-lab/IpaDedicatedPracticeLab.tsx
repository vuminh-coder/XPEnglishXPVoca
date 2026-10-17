"use client";

import React, { useState, useMemo, useCallback, useEffect, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Lightbulb,
  AlertTriangle,
  Layers,
  Mic,
  Volume2,
  Sparkles,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  Keyboard,
  Smile,
  MoveVertical,
  Wind,
  LayoutGrid,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ALL_IPA_SOUNDS,
  MONOPHTHONGS,
  DIPHTHONGS,
  CONSONANTS,
  IpaSound,
  resolveIpaSound,
  getSoundCategoryTheme,
  getSoundMannerFeature,
} from "../../data/ipaData";
import { IpaAudioPlayButton } from "../shared/IpaAudioPlayButton";
import { IpaMouthAnatomySvg } from "../shared/IpaMouthAnatomySvg";
import { IpaWordExampleCard } from "../shared/IpaWordExampleCard";
import { IpaSpeechRecorder } from "../shared/IpaSpeechRecorder";
import { playIpaIsolatedSound, stopIpaAudio } from "@/shared/utils/ipaAudioPlayer";
import { speakLessonText } from "@/shared/utils/ttsEngine";
import { useIpaCatalogStore, IpaPracticeCategory } from "@/stores/ipaCatalogStore";

export interface IpaDedicatedPracticeLabProps {
  initialSoundId?: string;
  className?: string;
}

type SoundCategoryFilter = IpaPracticeCategory;

export const IpaDedicatedPracticeLab: React.FC<IpaDedicatedPracticeLabProps> = ({
  initialSoundId,
  className = "",
}) => {
  const storeSoundId = useIpaCatalogStore((s) => s.practiceSelectedSoundId);
  const setStoreSoundId = useIpaCatalogStore((s) => s.setPracticeSelectedSoundId);
  const categoryFilter = useIpaCatalogStore((s) => s.practiceCategoryFilter);
  const setCategoryFilter = useIpaCatalogStore((s) => s.setPracticeCategoryFilter);
  const playbackRate = useIpaCatalogStore((s) => s.practicePlaybackRate);
  const setPlaybackRate = useIpaCatalogStore((s) => s.setPracticePlaybackRate);
  const accent = useIpaCatalogStore((s) => s.practiceAccent);
  const setAccent = useIpaCatalogStore((s) => s.setPracticeAccent);
  const activeWordTarget = useIpaCatalogStore((s) => s.practiceActiveWordTarget);
  const setActiveWordTarget = useIpaCatalogStore((s) => s.setPracticeActiveWordTarget);
  const isGuideOpen = useIpaCatalogStore((s) => s.practiceIsGuideOpen);
  const setIsGuideOpen = useIpaCatalogStore((s) => s.setPracticeIsGuideOpen);
  const recordPracticeScore = useIpaCatalogStore((s) => s.recordPracticeScore);

  // Mobile-First Studio Mode: "speech" (Microphone & Words) vs "anatomy" (Khẩu hình & Chi tiết)
  const [mobileStudioTab, setMobileStudioTab] = useState<"speech" | "anatomy">("speech");

  const selectedSoundId = initialSoundId || storeSoundId || ALL_IPA_SOUNDS[0].id;

  const handleSelectSoundId = useCallback(
    (id: string, updateUrl: boolean = true) => {
      setStoreSoundId(id);
      if (updateUrl && typeof window !== "undefined") {
        const url = new URL(window.location.href);
        url.searchParams.set("sound", id);
        window.history.replaceState(null, "", url.toString());
      }
    },
    [setStoreSoundId]
  );

  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Sync initial sound or incoming initialSoundId prop
  useEffect(() => {
    if (initialSoundId) {
      handleSelectSoundId(initialSoundId, true);
      setActiveWordTarget(null);
    }
  }, [initialSoundId, handleSelectSoundId, setActiveWordTarget]);

  // Sync with browser back/forward buttons (popstate)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handlePopState = () => {
        const params = new URLSearchParams(window.location.search);
        const soundParam = params.get("sound");
        if (soundParam) {
          const resolved = resolveIpaSound(soundParam);
          if (resolved) {
            handleSelectSoundId(resolved.id, false);
          }
        }
      };
      window.addEventListener("popstate", handlePopState);
      return () => window.removeEventListener("popstate", handlePopState);
    }
  }, [handleSelectSoundId]);

  // Current Sound Object
  const currentSound = useMemo(() => {
    return (
      ALL_IPA_SOUNDS.find((s) => s.id === selectedSoundId) || ALL_IPA_SOUNDS[0]
    );
  }, [selectedSoundId]);

  // Visual Theme
  const theme = useMemo(() => getSoundCategoryTheme(currentSound), [currentSound]);
  const mannerFeature = useMemo(() => getSoundMannerFeature(currentSound), [currentSound]);

  // Filtered sound list based on category filter
  const displayedSounds = useMemo(() => {
    if (categoryFilter === "monophthong") return MONOPHTHONGS;
    if (categoryFilter === "diphthong") return DIPHTHONGS;
    if (categoryFilter === "consonant") return CONSONANTS;
    return ALL_IPA_SOUNDS;
  }, [categoryFilter]);

  // Global index across all 44 sounds
  const currentIndex = useMemo(() => {
    return ALL_IPA_SOUNDS.findIndex((s) => s.id === currentSound.id);
  }, [currentSound.id]);

  // Current index in displayed category list
  const currentCategoryIndex = useMemo(() => {
    const idx = displayedSounds.findIndex((s) => s.id === currentSound.id);
    return idx >= 0 ? idx : 0;
  }, [displayedSounds, currentSound.id]);

  const prevSound = useMemo(() => {
    const prevIdx =
      (currentCategoryIndex - 1 + displayedSounds.length) % displayedSounds.length;
    return displayedSounds[prevIdx];
  }, [currentCategoryIndex, displayedSounds]);

  const nextSound = useMemo(() => {
    const nextIdx = (currentCategoryIndex + 1) % displayedSounds.length;
    return displayedSounds[nextIdx];
  }, [currentCategoryIndex, displayedSounds]);

  const handlePrevSound = useCallback(() => {
    stopIpaAudio();
    handleSelectSoundId(prevSound.id);
    setActiveWordTarget(null);
  }, [prevSound, handleSelectSoundId, setActiveWordTarget]);

  const handleNextSound = useCallback(() => {
    stopIpaAudio();
    handleSelectSoundId(nextSound.id);
    setActiveWordTarget(null);
  }, [nextSound, handleSelectSoundId, setActiveWordTarget]);

  const handleCategoryChange = useCallback(
    (newCategory: SoundCategoryFilter) => {
      setCategoryFilter(newCategory);
      let targetList = ALL_IPA_SOUNDS;
      if (newCategory === "monophthong") targetList = MONOPHTHONGS;
      else if (newCategory === "diphthong") targetList = DIPHTHONGS;
      else if (newCategory === "consonant") targetList = CONSONANTS;

      // If current sound is not in the new category, switch to the first sound in that category
      if (!targetList.some((s) => s.id === selectedSoundId)) {
        stopIpaAudio();
        handleSelectSoundId(targetList[0].id);
        setActiveWordTarget(null);
      }
    },
    [selectedSoundId, handleSelectSoundId, setCategoryFilter, setActiveWordTarget]
  );

  // Check scroll boundary limits for auto-hiding scroll chevrons
  const checkScrollLimits = useCallback(() => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 6);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 6);
    }
  }, []);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el) {
      const timer = setTimeout(checkScrollLimits, 80);
      el.addEventListener("scroll", checkScrollLimits, { passive: true });
      window.addEventListener("resize", checkScrollLimits);
      return () => {
        clearTimeout(timer);
        el.removeEventListener("scroll", checkScrollLimits);
        window.removeEventListener("resize", checkScrollLimits);
      };
    }
  }, [checkScrollLimits, displayedSounds, selectedSoundId]);

  // Auto-scroll active pill into center
  useEffect(() => {
    if (scrollContainerRef.current) {
      const activeEl = scrollContainerRef.current.querySelector(
        `[data-sound-id="${selectedSoundId}"]`
      );
      if (activeEl) {
        activeEl.scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest",
        });
      }
      setTimeout(checkScrollLimits, 200);
    }
  }, [selectedSoundId, checkScrollLimits]);

  // Keyboard navigation support: Left / Right arrow keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrevSound();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNextSound();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrevSound, handleNextSound]);

  // Current target word for microphone practice
  const currentPracticeWord = activeWordTarget || currentSound.keyWord;
  const currentPracticePhonetic = activeWordTarget
    ? currentSound.examples.find((e) => e.word === activeWordTarget)?.phonetic
    : currentSound.keyWordPhonetic;

  const handlePlayIsolated = useCallback(() => {
    stopIpaAudio();
    setIsAudioPlaying(true);
    playIpaIsolatedSound(currentSound.id, { rate: playbackRate });
    setTimeout(() => setIsAudioPlaying(false), 900);
  }, [currentSound.id, playbackRate]);

  return (
    <div className={`space-y-5 select-none ${className}`}>
      {/* ──────────────────────────────────────────────────────── */}
      {/* 1. FAST SOUND SELECTOR CAROUSEL WITH CATEGORY TABS */}
      {/* ──────────────────────────────────────────────────────── */}
      <div className="p-3 sm:p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-2.5">
        {/* Top Navigation & Category Filter Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          {/* Category Filter Tabs with Semantic Category Icons (Khử số đếm, hiển thị icon chuẩn xuyên suốt Mobile & Desktop) */}
          <div className="grid grid-cols-4 sm:flex items-center gap-1 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl overflow-x-auto hide-scrollbar w-full sm:w-auto">
            {(
              [
                {
                  id: "all",
                  label: "Tất cả",
                  shortLabel: "Tất cả",
                  icon: LayoutGrid,
                  iconColor: "text-[#0059bb] dark:text-sky-400",
                },
                {
                  id: "monophthong",
                  label: "Nguyên âm đơn",
                  shortLabel: "Âm đơn",
                  icon: Volume2,
                  iconColor: "text-sky-500 dark:text-sky-400",
                },
                {
                  id: "diphthong",
                  label: "Nguyên âm đôi",
                  shortLabel: "Âm đôi",
                  icon: Sparkles,
                  iconColor: "text-purple-600 dark:text-purple-400",
                },
                {
                  id: "consonant",
                  label: "Phụ âm",
                  shortLabel: "Phụ âm",
                  icon: Mic,
                  iconColor: "text-emerald-600 dark:text-emerald-400",
                },
              ] as const
            ).map((cat) => {
              const Icon = cat.icon;
              const isActive = categoryFilter === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`px-1.5 py-1.5 sm:px-2.5 sm:py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1 sm:gap-1.5 min-w-0 ${
                    isActive
                      ? "bg-white dark:bg-slate-700 text-[#0059bb] dark:text-sky-300 shadow-2xs"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-750"
                  }`}
                  title={cat.label}
                >
                  <Icon className={`w-3.5 h-3.5 shrink-0 ${cat.iconColor}`} />
                  <span className="hidden sm:inline truncate">{cat.label}</span>
                  <span className="sm:hidden truncate">{cat.shortLabel}</span>
                </button>
              );
            })}
          </div>

          {/* Stepper Controls Bar (Dàn đều 100% trên Mobile: Bên trái hiển thị thông tin âm, Bên phải hiển thị nút chuyển) */}
          <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto shrink-0">
            {/* Mobile-only Current Sound Indicator (Lấp đầy khoảng trống bên trái trên mobile, dàn đều 100%) */}
            <div className="sm:hidden flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300 font-semibold min-w-0">
              <span className="text-slate-400 text-[11px] shrink-0">Đang chọn:</span>
              <span className="font-mono font-bold text-[#0059bb] dark:text-sky-400 text-sm shrink-0">
                /{currentSound.symbol}/
              </span>
            </div>

            {/* Keyboard shortcut hint */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-xl bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200/70 dark:border-slate-700/70 select-none shadow-2xs">
              <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                <Keyboard className="w-4 h-4 stroke-[2.4] text-[#0059bb] dark:text-sky-400" />
                <span className="text-xs font-bold tracking-tight">Phím:</span>
              </div>
              <div className="flex items-center gap-1">
                <kbd
                  className="w-6 h-6 rounded-lg bg-white dark:bg-slate-700 border border-slate-200/90 dark:border-slate-600 flex items-center justify-center text-slate-800 dark:text-slate-100 shadow-2xs hover:scale-105 transition-transform"
                  title="Phím mũi tên trái: Âm trước"
                >
                  <ArrowLeft className="w-3.5 h-3.5 stroke-[3] text-slate-800 dark:text-slate-100" />
                </kbd>
                <kbd
                  className="w-6 h-6 rounded-lg bg-white dark:bg-slate-700 border border-slate-200/90 dark:border-slate-600 flex items-center justify-center text-slate-800 dark:text-slate-100 shadow-2xs hover:scale-105 transition-transform"
                  title="Phím mũi tên phải: Âm tiếp theo"
                >
                  <ArrowRight className="w-3.5 h-3.5 stroke-[3] text-slate-800 dark:text-slate-100" />
                </kbd>
              </div>
            </div>

            {/* Compact Prev / Counter / Next Bar */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-xl border border-slate-200/70 dark:border-slate-700/70 shadow-2xs shrink-0">
              <button
                type="button"
                onClick={handlePrevSound}
                className="w-7.5 h-7.5 rounded-lg flex items-center justify-center text-slate-600 hover:text-[#0059bb] hover:bg-white dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-sky-300 transition-all cursor-pointer"
                title={`Âm trước: /${prevSound.symbol}/ (Phím ←)`}
                aria-label="Âm trước"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="px-2.5 sm:px-3 flex items-center gap-1 text-xs select-none">
                <span className="font-bold font-mono text-[#0059bb] dark:text-sky-400 text-[13px]">
                  {(currentCategoryIndex + 1).toString().padStart(2, "0")}
                </span>
                <span className="text-slate-300 dark:text-slate-600 font-mono">/</span>
                <span className="text-slate-500 dark:text-slate-400 font-mono text-xs">
                  {displayedSounds.length.toString().padStart(2, "0")}
                </span>
              </div>

              <button
                type="button"
                onClick={handleNextSound}
                className="w-7.5 h-7.5 rounded-lg flex items-center justify-center text-slate-600 hover:text-[#0059bb] hover:bg-white dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-sky-300 transition-all cursor-pointer"
                title={`Âm tiếp theo: /${nextSound.symbol}/ (Phím →)`}
                aria-label="Âm tiếp theo"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable Sound Pills Strip with Safe-Zone & Desktop Controls */}
        <div className="relative group/carousel">
          {/* Left Gradient Edge Mask */}
          <div
            className={`absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white dark:from-slate-900 to-transparent pointer-events-none z-10 transition-opacity duration-300 ${
              canScrollLeft ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Desktop scroll left button */}
          <button
            type="button"
            onClick={() => {
              scrollContainerRef.current?.scrollBy({ left: -240, behavior: "smooth" });
              setTimeout(checkScrollLimits, 250);
            }}
            className={`absolute left-1.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/95 dark:bg-slate-800/95 shadow-md border border-slate-200/90 dark:border-slate-700 text-slate-700 dark:text-slate-300 hidden sm:flex items-center justify-center transition-all duration-200 cursor-pointer hover:bg-blue-50 dark:hover:bg-slate-700 hover:text-[#0059bb] hover:scale-105 active:scale-95 ${
              canScrollLeft
                ? "opacity-90 hover:opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
            aria-label="Cuộn sang trái"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Sound Pills Strip */}
          <div
            ref={scrollContainerRef}
            className="flex items-center gap-2 overflow-x-auto py-1 px-11 hide-scrollbar scroll-smooth"
          >
            {displayedSounds.map((sound) => {
              const isSelected = sound.id === currentSound.id;
              return (
                <button
                  key={sound.id}
                  data-sound-id={sound.id}
                  type="button"
                  onClick={() => {
                    stopIpaAudio();
                    handleSelectSoundId(sound.id);
                    setActiveWordTarget(null);
                  }}
                  className={`relative min-w-[44px] sm:min-w-[48px] h-10 px-2.5 rounded-xl font-sans shrink-0 transition-all cursor-pointer flex items-center justify-center select-none ${
                    isSelected
                      ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-black shadow-sm border border-slate-900 dark:border-white scale-[1.05]"
                      : "bg-slate-100/90 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/80 dark:hover:bg-slate-750 border border-slate-200/80 dark:border-slate-700/70 shadow-2xs hover:border-slate-300 dark:hover:border-slate-600 active:scale-[0.98]"
                  }`}
                  title={`${sound.name} (${sound.vietnameseGuide || sound.mouthShape})`}
                >
                  <span
                    className={`leading-none tracking-normal font-sans antialiased text-center ${
                      isSelected
                        ? "text-[15px] sm:text-base font-black"
                        : "text-[14px] sm:text-[15px] font-bold"
                    }`}
                  >
                    {sound.symbol}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Desktop scroll right button */}
          <button
            type="button"
            onClick={() => {
              scrollContainerRef.current?.scrollBy({ left: 240, behavior: "smooth" });
              setTimeout(checkScrollLimits, 250);
            }}
            className={`absolute right-1.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/95 dark:bg-slate-800/95 shadow-md border border-slate-200/90 dark:border-slate-700 text-slate-700 dark:text-slate-300 hidden sm:flex items-center justify-center transition-all duration-200 cursor-pointer hover:bg-blue-50 dark:hover:bg-slate-700 hover:text-[#0059bb] hover:scale-105 active:scale-95 ${
              canScrollRight
                ? "opacity-90 hover:opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
            aria-label="Cuộn sang phải"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Right Gradient Edge Mask */}
          <div
            className={`absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white dark:from-slate-900 to-transparent pointer-events-none z-10 transition-opacity duration-300 ${
              canScrollRight ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────── */}
      {/* MOBILE-FIRST DUAL-TAB SWITCHER (Visible ONLY on Mobile < lg) */}
      {/* ──────────────────────────────────────────────────────── */}
      <div className="lg:hidden flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200/80 dark:border-slate-700/80 shadow-2xs">
        <button
          type="button"
          onClick={() => setMobileStudioTab("speech")}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            mobileStudioTab === "speech"
              ? "bg-white dark:bg-slate-700 text-[#0059bb] dark:text-sky-300 shadow-2xs"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <Mic className="w-4 h-4 text-[#0059bb] dark:text-sky-400" />
          <span>Luyện Âm & Ghi Âm</span>
        </button>
        <button
          type="button"
          onClick={() => setMobileStudioTab("anatomy")}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            mobileStudioTab === "anatomy"
              ? "bg-white dark:bg-slate-700 text-[#0059bb] dark:text-sky-300 shadow-2xs"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <Smile className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>Khẩu Hình & Chi Tiết</span>
        </button>
      </div>

      {/* ──────────────────────────────────────────────────────── */}
      {/* 2. DEDICATED BALANCED STUDIO GRID (Desktop: 5/12 - 7/12) */}
      {/* ──────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
        {/* ──────────────────────────────────────────────────────── */}
        {/* LEFT COLUMN: ANATOMY & ARTICULATION (Mobile: Anatomy Tab | Desktop: 5/12) */}
        {/* ──────────────────────────────────────────────────────── */}
        <div
          className={`space-y-5 ${
            mobileStudioTab === "anatomy" ? "block" : "hidden"
          } lg:block lg:col-span-5`}
        >
          {/* Card: Anatomical Graphic & Consolidated 4-Quadrant Spec Sheet */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-4">
            {/* Header Title */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-400 flex items-center justify-center shrink-0 border border-blue-100/70 dark:border-blue-900/50">
                  <Smile className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white font-sans tracking-tight">
                    Khẩu Hình Chuẩn
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Mặt cắt vòm họng và chỉ số cấu âm
                  </p>
                </div>
              </div>

              <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono">
                /{currentSound.symbol}/
              </span>
            </div>

            {/* Sơ đồ khẩu hình SVG */}
            <IpaMouthAnatomySvg sound={currentSound} />

            {/* Consolidated 4-Quadrant Spec Sheet (Clean & Balanced Typography with Top-Right Icon Micro-Badges) */}
            <div className="grid grid-cols-2 gap-2.5 pt-1">
              {/* Quadrant 1: Khẩu hình môi */}
              <div className="p-3 sm:p-3.5 rounded-xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 flex flex-col justify-between min-h-[82px] transition-colors hover:border-slate-300 dark:hover:border-slate-600">
                <div className="flex items-center justify-between gap-1.5">
                  <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider select-none">
                    Khẩu hình môi
                  </span>
                  <div className="w-6 h-6 rounded-md bg-blue-50/90 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-400 flex items-center justify-center shrink-0 border border-blue-100/70 dark:border-blue-900/50">
                    <Smile className="w-3.5 h-3.5" />
                  </div>
                </div>
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 mt-2 leading-relaxed">
                  {currentSound.mouthShape.replace(/\s*\([^)]*\)/g, "")}
                </p>
              </div>

              {/* Quadrant 2: Vị trí lưỡi */}
              <div className="p-3 sm:p-3.5 rounded-xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 flex flex-col justify-between min-h-[82px] transition-colors hover:border-slate-300 dark:hover:border-slate-600">
                <div className="flex items-center justify-between gap-1.5">
                  <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider select-none">
                    Vị trí lưỡi
                  </span>
                  <div className="w-6 h-6 rounded-md bg-blue-50/90 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-400 flex items-center justify-center shrink-0 border border-blue-100/70 dark:border-blue-900/50">
                    <Layers className="w-3.5 h-3.5" />
                  </div>
                </div>
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 mt-2 leading-relaxed">
                  {currentSound.tonguePosition.replace(/\s*\([^)]*\)/g, "")}
                </p>
              </div>

              {/* Quadrant 3: Độ mở hàm */}
              <div className="p-3 sm:p-3.5 rounded-xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 flex flex-col justify-between min-h-[82px] transition-colors hover:border-slate-300 dark:hover:border-slate-600">
                <div className="flex items-center justify-between gap-1.5">
                  <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider select-none">
                    Độ mở hàm
                  </span>
                  <div className="w-6 h-6 rounded-md bg-blue-50/90 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-400 flex items-center justify-center shrink-0 border border-blue-100/70 dark:border-blue-900/50">
                    <MoveVertical className="w-3.5 h-3.5" />
                  </div>
                </div>
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 mt-2 leading-relaxed">
                  {currentSound.jawOpening.replace(/\s*\([^)]*\)/g, "")}
                </p>
              </div>

              {/* Quadrant 4: Dây thanh âm */}
              <div className="p-3 sm:p-3.5 rounded-xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 flex flex-col justify-between min-h-[82px] transition-colors hover:border-slate-300 dark:hover:border-slate-600">
                <div className="flex items-center justify-between gap-1.5">
                  <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider select-none">
                    Dây thanh âm
                  </span>
                  <div className="w-6 h-6 rounded-md bg-blue-50/90 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-400 flex items-center justify-center shrink-0 border border-blue-100/70 dark:border-blue-900/50">
                    <Mic className="w-3.5 h-3.5" />
                  </div>
                </div>
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 mt-2 leading-relaxed flex items-center gap-1.5">
                  <span
                    className={`w-2 h-2 rounded-full shrink-0 ${
                      currentSound.voicing === "voiced"
                        ? "bg-emerald-500"
                        : "bg-amber-500"
                    }`}
                  />
                  <span>
                    {currentSound.voicing === "voiced"
                      ? "Dây thanh rung • Hữu thanh"
                      : "Không rung dây thanh • Vô thanh"}
                  </span>
                </p>
              </div>
            </div>

            {/* Collapsible Articulation Pedagogical Guide */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setIsGuideOpen(!isGuideOpen)}
                className="w-full py-2.5 px-3 sm:px-3.5 rounded-xl bg-slate-50/90 dark:bg-slate-800/60 hover:bg-blue-50/80 dark:hover:bg-blue-950/40 border border-slate-200/80 dark:border-slate-700/80 hover:border-blue-200 dark:hover:border-blue-800/80 text-slate-700 dark:text-slate-200 hover:text-[#0059bb] dark:hover:text-sky-400 flex items-center justify-between transition-all cursor-pointer group shadow-2xs active:scale-[0.99]"
                aria-expanded={isGuideOpen}
              >
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-400 flex items-center justify-center shrink-0 border border-blue-100/70 dark:border-blue-900/50">
                    <BookOpen className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-bold font-sans">
                    Cẩm nang cấu âm & Mẹo độc quyền
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#0059bb] dark:text-sky-400">
                  <span>{isGuideOpen ? "Ẩn cẩm nang" : "Mở cẩm nang"}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-300 ${
                      isGuideOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </button>

              {/* Animated Expandable Body */}
              <AnimatePresence>
                {isGuideOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden space-y-2.5 pt-3"
                  >
                    {/* 1. Technical Guide */}
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                      <span className="font-bold text-slate-900 dark:text-white mr-1.5">
                        Kỹ thuật phát âm chuẩn:
                      </span>
                      {currentSound.vietnameseGuide}
                    </div>

                    {/* 2. Pro Tip */}
                    <div className="p-3 rounded-xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/40 flex items-start gap-2.5">
                      <Lightbulb className="w-4 h-4 text-[#0059bb] dark:text-sky-400 shrink-0 mt-0.5" />
                      <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                        <span className="font-bold text-[#0059bb] dark:text-sky-400 mr-1.5">
                          Mẹo vàng ghi nhớ:
                        </span>
                        {currentSound.practiceTip}
                      </div>
                    </div>

                    {/* 3. Common Mistake Warning */}
                    <div className="p-3 rounded-xl bg-rose-50/80 dark:bg-rose-950/40 border border-rose-100 dark:border-rose-900/40 flex items-start gap-2.5">
                      <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                      <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                        <span className="font-bold text-rose-600 dark:text-rose-400 mr-1.5">
                          Lỗi sai người Việt hay gặp:
                        </span>
                        {currentSound.commonMistakes}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* ──────────────────────────────────────────────────────── */}
        {/* RIGHT COLUMN: IDENTITY, SPEECH LAB & WORD DECK (Mobile: Speech Tab | Desktop: 7/12) */}
        {/* ──────────────────────────────────────────────────────── */}
        <div
          className={`space-y-5 ${
            mobileStudioTab === "speech" ? "block" : "hidden"
          } lg:block lg:col-span-7`}
        >
          {/* Card 1: Sound Identity & Master Acoustic Controller */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-4">
            {/* Top Identity Row: Phong cách Image 2 chuẩn IpaMatrixBoard (Giếng âm tinh gọn + 2 Badge độc lập + Từ mẫu đại diện) */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2.5 border-b border-slate-200/60 dark:border-slate-700/60">
              {/* Bên trái: Giếng biểu tượng âm thu nhỏ + 2 Badge phân loại nằm ngang */}
              <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap min-w-0">
                {/* Giếng biểu tượng âm tinh gọn & đổi màu chuẩn theo phân loại âm */}
                <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl ${theme.badgeBg} border shadow-2xs flex items-center justify-center shrink-0`}>
                  <span className={`text-base sm:text-lg font-black font-sans ${theme.textColor} leading-none`}>
                    /{currentSound.symbol}/
                  </span>
                </div>

                {/* Badge 1: Cơ chế thanh quản (Vô thanh / Hữu thanh / Loại nguyên âm) */}
                <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold border ${theme.badgeBg} ${theme.textColor}`}>
                  <span className={`w-2 h-2 rounded-full shrink-0 ${theme.dotColor}`} />
                  <span>{theme.name}</span>
                </div>

                {/* Badge 2: Đặc tính cấu âm tách riêng (Bật hơi, Thổi gió, Âm mũi...) */}
                {mannerFeature && (
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold bg-sky-50 dark:bg-sky-950/60 border border-sky-200/80 dark:border-sky-800/60 text-sky-700 dark:text-sky-300 shadow-2xs">
                    <Wind className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                    <span>{mannerFeature}</span>
                  </div>
                )}
              </div>

              {/* Bên phải: Từ mẫu đại diện dàn gọn gàng sang góc đối xứng */}
              <button
                type="button"
                onClick={() => speakLessonText(currentSound.keyWord, { accent, rate: playbackRate })}
                className="flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 rounded-lg bg-slate-50/90 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/60 dark:border-white/5 shrink-0 self-start sm:self-auto cursor-pointer transition-colors"
                title={`Bấm để nghe từ mẫu: "${currentSound.keyWord}"`}
              >
                <span className="text-xs text-slate-500 dark:text-slate-400">Từ mẫu:</span>
                <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white capitalize font-sans">
                  {currentSound.keyWord}
                </span>
                <span className={`font-mono text-xs font-bold ${theme.textColor}`}>
                  {currentSound.keyWordPhonetic}
                </span>
              </button>
            </div>

            {/* Master Acoustic Comparison Stage */}
            <div className="space-y-3 pt-0.5">
              {/* Row 1: 2 khối điều khiển mỗi khối 1 bên (Trái: Tốc độ, Phải: Giọng phát âm) */}
              <div className="flex items-center justify-between gap-2 w-full">
                {/* Khối 1: Tốc độ phát (0.8x / 1.0x) bên trái */}
                <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg border border-slate-200/60 dark:border-slate-700/60 shrink-0">
                  {[0.8, 1.0].map((rate) => (
                    <button
                      key={rate}
                      type="button"
                      onClick={() => setPlaybackRate(rate)}
                      className={`px-2.5 py-1 rounded-md text-xs font-bold font-mono transition-all cursor-pointer whitespace-nowrap ${
                        playbackRate === rate
                          ? "bg-white dark:bg-slate-700 text-[#0059bb] dark:text-sky-300 shadow-2xs"
                          : "text-slate-500 hover:text-slate-800 dark:text-slate-400"
                      }`}
                      title={`Tốc độ phát: ${rate.toFixed(1)}x`}
                    >
                      {rate.toFixed(1)}x
                    </button>
                  ))}
                </div>

                {/* Khối 2: Giọng phát âm (US / UK / AU) bên phải */}
                <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg border border-slate-200/60 dark:border-slate-700/60 shrink-0">
                  {(["en-US", "en-GB", "en-AU"] as const).map((acc) => (
                    <button
                      key={acc}
                      type="button"
                      onClick={() => setAccent(acc)}
                      className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                        accent === acc
                          ? "bg-white dark:bg-slate-700 text-[#0059bb] dark:text-sky-300 shadow-2xs"
                          : "text-slate-500 hover:text-slate-800 dark:text-slate-400"
                      }`}
                      title={`Giọng phát âm: ${acc === "en-US" ? "Mỹ (US)" : acc === "en-GB" ? "Anh (UK)" : "Úc (AU)"}`}
                    >
                      {acc === "en-US" ? "US" : acc === "en-GB" ? "UK" : "AU"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Row 2: Dual Balanced Action Cards (50% / 50% Grid) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {/* Primary Action 1: Isolated Phoneme Master Play */}
                <button
                  type="button"
                  onClick={handlePlayIsolated}
                  className={`h-11 px-3 sm:px-4 rounded-xl font-sans font-bold text-xs flex items-center justify-center gap-2 shadow-xs cursor-pointer active:scale-95 transition-all min-w-0 ${
                    isAudioPlaying
                      ? "bg-[#004ba0] text-white ring-2 ring-blue-400/40 animate-pulse"
                      : "bg-[#0059bb] hover:bg-[#004ba0] text-white shadow-blue-500/20 shadow-md"
                  }`}
                  title={`Nghe âm cô lập chuẩn quốc tế /${currentSound.symbol}/`}
                >
                  <Volume2 className={`w-4 h-4 text-white shrink-0 ${isAudioPlaying ? "animate-bounce" : ""}`} />
                  <span className="whitespace-nowrap truncate">Nghe âm /{currentSound.symbol}/</span>
                </button>

                {/* Secondary Action 2: Keyword Word Play */}
                <IpaAudioPlayButton
                  text={currentSound.keyWord}
                  rate={playbackRate}
                  accent={accent}
                  size="md"
                  variant="secondary"
                  className="w-full h-11 justify-center border-slate-200/80 dark:border-slate-700 bg-slate-100/90 hover:bg-slate-200/90 dark:bg-slate-800 dark:hover:bg-slate-750 font-bold text-slate-800 dark:text-slate-200 min-w-0"
                  label={`Từ mẫu: "${currentSound.keyWord}"`}
                />
              </div>
            </div>
          </div>

          {/* Card 2: AI Microphone Studio Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-400">
                  <Mic className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-sans tracking-tight">
                    Studio Thu Âm AI Microphone
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Phân tích âm lượng, cao độ và đối sánh mẫu chuẩn
                  </p>
                </div>
              </div>
            </div>

            {/* Reusable Speech Recorder */}
            <IpaSpeechRecorder
              targetWord={currentPracticeWord}
              targetPhonetic={currentPracticePhonetic}
              acceptableWords={currentSound.examples.map((e) => e.word)}
              xpReward={15}
              onResult={(res) => recordPracticeScore(currentSound.id, res.score)}
            />
          </div>

          {/* Card 3: Word Examples Practice Deck */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-3.5">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 font-display">
                  Từ vựng ví dụ thực tế ({currentSound.examples.length})
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  Chạm vào thẻ từ bất kỳ để chọn làm mẫu thu âm AI phía trên
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {currentSound.examples.map((example) => {
                const isTarget = currentPracticeWord === example.word;
                return (
                  <IpaWordExampleCard
                    key={example.word}
                    example={example}
                    rate={playbackRate}
                    accent={accent}
                    isSelected={isTarget}
                    onSelect={(ex) => setActiveWordTarget(ex.word)}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
