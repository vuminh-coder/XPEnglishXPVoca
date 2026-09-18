"use client";

import React, { useState, useMemo, useCallback, useEffect, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
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
} from "lucide-react";
import {
  ALL_IPA_SOUNDS,
  MONOPHTHONGS,
  DIPHTHONGS,
  CONSONANTS,
  IpaSound,
  getSoundDisplayHint,
} from "../../data/ipaData";
import { IpaSoundBadge } from "../shared/IpaSoundBadge";
import { IpaAudioPlayButton } from "../shared/IpaAudioPlayButton";
import { IpaMouthAnatomySvg } from "../shared/IpaMouthAnatomySvg";
import { IpaWordExampleCard } from "../shared/IpaWordExampleCard";
import { IpaSpeechRecorder } from "../shared/IpaSpeechRecorder";
import { playIpaIsolatedSound, stopIpaAudio } from "@/shared/utils/ipaAudioPlayer";
import { speakLessonText } from "@/shared/utils/ttsEngine";

export interface IpaDedicatedPracticeLabProps {
  initialSoundId?: string;
  className?: string;
}

type SoundCategoryFilter = "all" | "monophthong" | "diphthong" | "consonant";

export const IpaDedicatedPracticeLab: React.FC<IpaDedicatedPracticeLabProps> = ({
  initialSoundId,
  className = "",
}) => {
  const [selectedSoundId, setSelectedSoundId] = useState<string>(
    initialSoundId || ALL_IPA_SOUNDS[0].id
  );
  const [categoryFilter, setCategoryFilter] = useState<SoundCategoryFilter>("all");
  const [playbackRate, setPlaybackRate] = useState<number>(1.0);
  const [accent, setAccent] = useState<"en-US" | "en-GB" | "en-AU">("en-US");
  const [activeWordTarget, setActiveWordTarget] = useState<string | null>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialSoundId) {
      setSelectedSoundId(initialSoundId);
      setActiveWordTarget(null);
    }
  }, [initialSoundId]);

  // Current Sound Object
  const currentSound = useMemo(() => {
    return (
      ALL_IPA_SOUNDS.find((s) => s.id === selectedSoundId) || ALL_IPA_SOUNDS[0]
    );
  }, [selectedSoundId]);

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
    setSelectedSoundId(prevSound.id);
    setActiveWordTarget(null);
  }, [prevSound]);

  const handleNextSound = useCallback(() => {
    stopIpaAudio();
    setSelectedSoundId(nextSound.id);
    setActiveWordTarget(null);
  }, [nextSound]);

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
        setSelectedSoundId(targetList[0].id);
        setActiveWordTarget(null);
      }
    },
    [selectedSoundId]
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
    <div className={`space-y-6 select-none ${className}`}>
      {/* ──────────────────────────────────────────────────────── */}
      {/* 1. FAST SOUND SELECTOR CAROUSEL WITH CATEGORY TABS */}
      {/* ──────────────────────────────────────────────────────── */}
      <div className="p-3 sm:p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-2.5">
        {/* Top Navigation & Category Filter Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          {/* Category Filter Tabs with Micro Badges */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl overflow-x-auto hide-scrollbar">
            {(
              [
                { id: "all", label: "Tất cả", count: 44, icon: Layers },
                { id: "monophthong", label: "Nguyên âm đơn", count: 12, icon: Volume2 },
                { id: "diphthong", label: "Nguyên âm đôi", count: 8, icon: Sparkles },
                { id: "consonant", label: "Phụ âm", count: 24, icon: Mic },
              ] as const
            ).map((cat) => {
              const Icon = cat.icon;
              const isActive = categoryFilter === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? "bg-white dark:bg-slate-700 text-[#0059bb] dark:text-sky-300 shadow-2xs"
                      : "text-slate-500 hover:text-slate-800 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-750"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 opacity-80" />
                  <span>{cat.label}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold ${
                      isActive
                        ? "bg-blue-50 text-[#0059bb] dark:bg-sky-950/60 dark:text-sky-300"
                        : "bg-slate-200/70 text-slate-500 dark:bg-slate-750 dark:text-slate-400"
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Prev / Next Controls with Clean Counter & Keyboard Hint */}
          <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
            {/* Keyboard shortcut hint with bold tactile icons */}
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
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-xl border border-slate-200/70 dark:border-slate-700/70 shadow-2xs">
              <button
                type="button"
                onClick={handlePrevSound}
                className="w-7.5 h-7.5 rounded-lg flex items-center justify-center text-slate-600 hover:text-[#0059bb] hover:bg-white dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-sky-300 transition-all cursor-pointer"
                title={`Âm trước: /${prevSound.symbol}/ (Phím ←)`}
                aria-label="Âm trước"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="px-3 flex items-center gap-1 text-xs select-none">
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

        {/* Scrollable Sound Pills with Safe-Zone & Desktop Controls */}
        <div className="relative group/carousel">
          {/* Left Gradient Edge Mask */}
          <div
            className={`absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white dark:from-slate-900 to-transparent pointer-events-none z-10 transition-opacity duration-300 ${
              canScrollLeft ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Desktop scroll left button with safe placement */}
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

          {/* Sound Pills Strip with Safe px-11 Buffer to Never Overlap */}
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
                    setSelectedSoundId(sound.id);
                    setActiveWordTarget(null);
                  }}
                  className={`relative min-w-[50px] h-10 px-3 rounded-xl font-sans font-bold text-sm shrink-0 transition-all cursor-pointer flex flex-col items-center justify-center gap-0.5 ${
                    isSelected
                      ? "bg-[#0059bb] text-white shadow-md shadow-blue-500/25 ring-2 ring-blue-400/50 scale-[1.05]"
                      : "bg-slate-100/90 dark:bg-slate-800/90 text-slate-700 dark:text-slate-300 hover:bg-slate-200/90 dark:hover:bg-slate-750 border border-slate-200/70 dark:border-slate-700/70 hover:scale-[1.02]"
                  }`}
                  title={`${sound.name} (${sound.vietnameseGuide || sound.mouthShape})`}
                >
                  <span className="leading-none tracking-normal font-sans antialiased text-[15px] pt-0.5">
                    {sound.symbol}
                  </span>
                  {/* Elegant Category Nano Accent Bar */}
                  <span
                    className={`w-3.5 h-[2.5px] rounded-full transition-all ${
                      isSelected
                        ? "bg-white/95 w-4"
                        : sound.category === "monophthong"
                        ? "bg-blue-400/90 dark:bg-blue-400"
                        : sound.category === "diphthong"
                        ? "bg-purple-400/90 dark:bg-purple-400"
                        : sound.voicing === "voiced"
                        ? "bg-emerald-400/90 dark:bg-emerald-400"
                        : "bg-amber-400/90 dark:bg-amber-400"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Desktop scroll right button with safe placement */}
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
      {/* 2. DEDICATED BALANCED STUDIO (6/12 - 6/12) */}
      {/* ──────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
        {/* ──────────────────────────────────────────────────────── */}
        {/* LEFT COLUMN: SOUND IDENTITY, ACOUSTICS & ANATOMY (6/12) */}
        {/* ──────────────────────────────────────────────────────── */}
        <div className="lg:col-span-6 space-y-5">
          {/* Card 1: Sound Identity & Master Acoustic Controller */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-4">
            {/* Top Identity Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3.5">
              <div className="space-y-1.5 min-w-0">
                <div className="flex items-center gap-2 min-w-0">
                  <IpaSoundBadge sound={currentSound} size="md" variant="classification" className="shrink-0" />
                  <span
                    className="text-xs font-semibold text-slate-500 dark:text-slate-400 truncate whitespace-nowrap"
                    title={getSoundDisplayHint(currentSound)}
                  >
                    {getSoundDisplayHint(currentSound)}
                  </span>
                </div>
                <div className="flex items-baseline gap-1.5 select-none min-w-0 whitespace-nowrap">
                  <span className="text-2xl sm:text-3xl font-light text-slate-300 dark:text-slate-600 font-sans shrink-0">
                    /
                  </span>
                  <span className="text-4xl sm:text-5xl font-bold font-sans tracking-normal text-slate-900 dark:text-white shrink-0">
                    {currentSound.symbol}
                  </span>
                  <span className="text-2xl sm:text-3xl font-light text-slate-300 dark:text-slate-600 font-sans shrink-0">
                    /
                  </span>
                  <span className="ml-1 text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 truncate">
                    ({currentSound.name})
                  </span>
                </div>
              </div>

              {/* Keyword Anchor Card - Interactive Audio Button */}
              <button
                type="button"
                onClick={() => speakLessonText(currentSound.keyWord, { accent, rate: playbackRate })}
                className="group/word px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50/80 dark:hover:bg-slate-800 border border-slate-200/70 hover:border-blue-300 dark:border-slate-800 dark:hover:border-slate-700 transition-all cursor-pointer text-left sm:text-right space-y-0.5 shadow-2xs active:scale-[0.98] shrink-0 min-w-0"
                title={`Bấm để nghe phát âm từ mẫu: "${currentSound.keyWord}"`}
              >
                <div className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 flex items-center sm:justify-end gap-1.5 group-hover/word:text-[#0059bb] dark:group-hover/word:text-sky-400 transition-colors whitespace-nowrap">
                  <span>Từ mẫu đại diện</span>
                  <Volume2 className="w-3.5 h-3.5 opacity-70 group-hover/word:opacity-100 shrink-0" />
                </div>
                <div className="flex items-center sm:justify-end gap-1.5 whitespace-nowrap">
                  <span className="font-bold text-slate-900 dark:text-white text-base capitalize group-hover/word:text-[#0059bb] dark:group-hover/word:text-sky-300 transition-colors truncate max-w-[140px]">
                    {currentSound.keyWord}
                  </span>
                  <span className="font-mono text-xs font-bold text-[#0059bb] dark:text-sky-400 shrink-0">
                    {currentSound.keyWordPhonetic}
                  </span>
                </div>
              </button>
            </div>

            {/* Master Acoustic Comparison Stage */}
            <div className="space-y-3 pt-0.5">
              {/* Row 1: Section Title + Speed & Accent Control Docks */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5 whitespace-nowrap shrink-0">
                  <Volume2 className="w-4 h-4 text-[#0059bb] dark:text-sky-400 shrink-0" />
                  <span>Luyện Nghe Chuẩn Âm</span>
                </div>

                {/* Speed & Accent Pickers */}
                <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                  {/* Speed Selector */}
                  <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg border border-slate-200/60 dark:border-slate-700/60 shrink-0">
                    {[0.8, 1.0].map((rate) => (
                      <button
                        key={rate}
                        type="button"
                        onClick={() => setPlaybackRate(rate)}
                        className={`px-2 py-0.5 rounded-md text-[11px] font-bold font-mono transition-all cursor-pointer whitespace-nowrap ${
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

                  {/* Accent Selector */}
                  <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg border border-slate-200/60 dark:border-slate-700/60 shrink-0">
                    {(["en-US", "en-GB", "en-AU"] as const).map((acc) => (
                      <button
                        key={acc}
                        type="button"
                        onClick={() => setAccent(acc)}
                        className={`px-2 py-0.5 rounded-md text-[11px] font-bold transition-all cursor-pointer whitespace-nowrap ${
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

          {/* Card 2: Anatomical Graphic & Consolidated 4-Quadrant Spec Sheet */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-4">
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
                  {currentSound.mouthShape}
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
                  {currentSound.tonguePosition}
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
                  {currentSound.jawOpening}
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
                        : "bg-slate-400 dark:bg-slate-500"
                    }`}
                  />
                  <span>
                    {currentSound.voicing === "voiced"
                      ? "Dây thanh rung (Hữu thanh)"
                      : "Không rung dây thanh (Vô thanh)"}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Card 3: Cẩm Nang Cấu Âm & Mẹo Sư Phạm Độc Quyền */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-3.5">
            <div className="text-xs font-black uppercase tracking-wider text-slate-400 font-display flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-[#0059bb]" />
              <span>Cẩm nang cấu âm & Mẹo độc quyền</span>
            </div>

            {/* 1. Technical Guide */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              <span className="font-bold text-slate-900 dark:text-white mr-1.5">
                Kỹ thuật phát âm chuẩn:
              </span>
              {currentSound.vietnameseGuide}
            </div>

            {/* 2. Pro Tip */}
            <div className="p-3.5 rounded-xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/40 flex items-start gap-2.5">
              <Lightbulb className="w-4 h-4 text-[#0059bb] dark:text-sky-400 shrink-0 mt-0.5" />
              <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                <span className="font-bold text-[#0059bb] dark:text-sky-400 mr-1.5">
                  Mẹo vàng ghi nhớ:
                </span>
                {currentSound.practiceTip}
              </div>
            </div>

            {/* 3. Common Mistake Warning */}
            <div className="p-3.5 rounded-xl bg-rose-50/80 dark:bg-rose-950/40 border border-rose-100 dark:border-rose-900/40 flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                <span className="font-bold text-rose-600 dark:text-rose-400 mr-1.5">
                  Lỗi sai người Việt hay gặp:
                </span>
                {currentSound.commonMistakes}
              </div>
            </div>
          </div>
        </div>

        {/* ──────────────────────────────────────────────────────── */}
        {/* RIGHT COLUMN: AI SPEECH LAB & WORD DECK (6/12) */}
        {/* ──────────────────────────────────────────────────────── */}
        <div className="lg:col-span-6 space-y-5">
          {/* Card 1: AI Microphone Studio Card */}
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

              <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-emerald-500" />
                <span>+15 XP & +5 Vàng</span>
              </span>
            </div>

            {/* Reusable Speech Recorder */}
            <IpaSpeechRecorder
              targetWord={currentPracticeWord}
              targetPhonetic={currentPracticePhonetic}
              acceptableWords={currentSound.examples.map((e) => e.word)}
              xpReward={15}
            />
          </div>

          {/* Card 2: Word Examples Practice Deck */}
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

          {/* Card 3: Studio Progression & Symmetrical Sound Navigation Stepper */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-2.5 sm:gap-3 shadow-2xs">
            {/* Prev Sound Button */}
            <button
              type="button"
              onClick={handlePrevSound}
              className="group h-10 px-3 sm:px-3.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-blue-50/80 dark:hover:bg-blue-950/40 border border-slate-200/80 dark:border-slate-700 hover:border-blue-200 dark:hover:border-blue-800/80 shadow-2xs transition-all duration-200 flex items-center gap-2 cursor-pointer active:scale-98 shrink-0"
              title={`Âm trước: /${prevSound.symbol}/ (Phím ←)`}
              aria-label={`Âm trước: /${prevSound.symbol}/`}
            >
              <ArrowLeft className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0059bb] dark:text-slate-500 dark:group-hover:text-sky-400 transition-colors" />
              <div className="flex flex-col items-start leading-none text-left">
                <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium select-none">
                  Âm trước
                </span>
                <span className="text-xs font-bold font-mono text-slate-800 dark:text-slate-200 group-hover:text-[#0059bb] dark:group-hover:text-sky-400 transition-colors mt-0.5">
                  /{prevSound.symbol}/
                </span>
              </div>
            </button>

            {/* Centered Counter & KBD Shortcut Pills */}
            <div className="text-center min-w-0 px-1">
              <div className="flex items-center justify-center gap-1.5 text-xs select-none">
                <span className="font-semibold text-slate-500 dark:text-slate-400 text-xs">Âm</span>
                <span className="font-bold font-mono text-[#0059bb] dark:text-sky-400 text-sm sm:text-base">
                  {(currentCategoryIndex + 1).toString().padStart(2, "0")}
                </span>
                <span className="text-slate-300 dark:text-slate-600 font-mono text-xs">/</span>
                <span className="text-slate-500 dark:text-slate-400 font-mono text-xs sm:text-sm">
                  {displayedSounds.length.toString().padStart(2, "0")}
                </span>
              </div>
              <div className="flex items-center justify-center gap-1.5 mt-1.5 text-slate-500 dark:text-slate-400">
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 select-none">
                  Phím:
                </span>
                <kbd
                  className="w-5.5 h-5.5 rounded-md bg-white dark:bg-slate-700 border border-slate-200/90 dark:border-slate-600 flex items-center justify-center text-slate-700 dark:text-slate-200 shadow-2xs"
                  title="Phím mũi tên trái: Âm trước"
                >
                  <ArrowLeft className="w-3.5 h-3.5 stroke-[2.5]" />
                </kbd>
                <kbd
                  className="w-5.5 h-5.5 rounded-md bg-white dark:bg-slate-700 border border-slate-200/90 dark:border-slate-600 flex items-center justify-center text-slate-700 dark:text-slate-200 shadow-2xs"
                  title="Phím mũi tên phải: Âm tiếp theo"
                >
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </kbd>
              </div>
            </div>

            {/* Next Sound Button */}
            <button
              type="button"
              onClick={handleNextSound}
              className="group h-10 px-3 sm:px-3.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-blue-50/80 dark:hover:bg-blue-950/40 border border-slate-200/80 dark:border-slate-700 hover:border-blue-200 dark:hover:border-blue-800/80 shadow-2xs transition-all duration-200 flex items-center gap-2 cursor-pointer active:scale-98 shrink-0"
              title={`Âm tiếp theo: /${nextSound.symbol}/ (Phím →)`}
              aria-label={`Âm tiếp theo: /${nextSound.symbol}/`}
            >
              <div className="flex flex-col items-end leading-none text-right">
                <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium select-none">
                  Âm sau
                </span>
                <span className="text-xs font-bold font-mono text-slate-800 dark:text-slate-200 group-hover:text-[#0059bb] dark:group-hover:text-sky-400 transition-colors mt-0.5">
                  /{nextSound.symbol}/
                </span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0059bb] dark:text-slate-500 dark:group-hover:text-sky-400 transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
