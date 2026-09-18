"use client";

import React, { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Volume2,
  Search,
  BookOpen,
  Sparkles,
  Layers,
  ChevronRight,
  Flame,
  X,
  Compass,
  Headphones,
  Award,
} from "lucide-react";
import {
  ALL_IPA_SOUNDS,
  MONOPHTHONGS,
  DIPHTHONGS,
  CONSONANTS,
  IpaSound,
  IpaCategory,
  IpaSoundCard,
  IpaSoundInspector,
  IpaMinimalPairsTrainer,
} from "@/features/ipa";
import { speakLessonText, stopTTS } from "@/shared/utils/ttsEngine";
import { PageEntranceWrapper } from "@/shared/components/feedback/PageEntranceAnimation";

type TabViewMode = "all" | "monophthong" | "diphthong" | "consonant" | "minimal_pairs";

export default function IpaStudioPage() {
  const [activeTab, setActiveTab] = useState<TabViewMode>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedSound, setSelectedSound] = useState<IpaSound | null>(
    () => ALL_IPA_SOUNDS[0]
  );
  const [playingSoundId, setPlayingSoundId] = useState<string | null>(null);

  // Filtered sounds list based on tab and search query
  const filteredSounds = useMemo(() => {
    let list = ALL_IPA_SOUNDS;

    if (activeTab === "monophthong") {
      list = MONOPHTHONGS;
    } else if (activeTab === "diphthong") {
      list = DIPHTHONGS;
    } else if (activeTab === "consonant") {
      list = CONSONANTS;
    }

    if (!searchQuery.trim()) return list;

    const q = searchQuery.toLowerCase().trim();
    return list.filter(
      (s) =>
        s.symbol.toLowerCase().includes(q) ||
        s.name.toLowerCase().includes(q) ||
        s.keyWord.toLowerCase().includes(q) ||
        s.vietnameseGuide.toLowerCase().includes(q) ||
        s.examples.some((ex) => ex.word.toLowerCase().includes(q))
    );
  }, [activeTab, searchQuery]);

  // Audio Player Trigger
  const handlePlaySound = useCallback((text: string, rate = 1.0) => {
    stopTTS();
    speakLessonText(text, { accent: "en-US", rate });
  }, []);

  // Card Audio Click
  const handleCardPlayAudio = useCallback(
    (sound: IpaSound, e: React.MouseEvent) => {
      e.stopPropagation();
      setPlayingSoundId(sound.id);
      handlePlaySound(sound.audioSampleText, 1.0);
      setTimeout(() => setPlayingSoundId(null), 1500);
    },
    [handlePlaySound]
  );

  // Card Selection
  const handleSelectSound = useCallback(
    (sound: IpaSound) => {
      setSelectedSound(sound);
      setPlayingSoundId(sound.id);
      handlePlaySound(sound.audioSampleText, 1.0);
      setTimeout(() => setPlayingSoundId(null), 1200);

      // On mobile view, smooth scroll to inspector
      if (typeof window !== "undefined" && window.innerWidth < 1024) {
        const inspectorEl = document.getElementById("ipa-sound-inspector-pane");
        if (inspectorEl) {
          inspectorEl.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    },
    [handlePlaySound]
  );

  return (
    <PageEntranceWrapper>
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 select-none">
        {/* 1. TOP BREADCRUMB & HEADER BANNER */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <Link
              href="/dashboard"
              className="hover:text-[#0059bb] dark:hover:text-sky-400 transition-colors"
            >
              Trang chủ
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-400">Luyện tập</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#0059bb] dark:text-sky-400 font-bold">
              Bảng phiên âm IPA
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight font-display">
                  Bảng Phiên Âm Quốc Tế IPA
                </h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-2xs">
                  44 PHONICS
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
                Làm chủ trọn vẹn 44 âm chuẩn quốc tế, trực quan hóa khẩu hình môi & vị trí đặt lưỡi, so sánh cặp âm đối chiếu và luyện nói cùng AI.
              </p>
            </div>

            {/* Quick Stats Banner */}
            <div className="flex items-center gap-2.5 shrink-0">
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200/70 dark:border-blue-800/50">
                <Headphones className="w-4 h-4 text-[#0059bb] dark:text-sky-400" />
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Chuẩn Anh - Mỹ (GenAm)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. NAVIGATION PILLS & SEARCH BAR */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-white/5 overflow-x-auto hide-scrollbar">
            <button
              type="button"
              onClick={() => setActiveTab("all")}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === "all"
                  ? "bg-white dark:bg-slate-700 text-[#0059bb] dark:text-sky-300 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Tất cả (44 âm)
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("monophthong")}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === "monophthong"
                  ? "bg-white dark:bg-slate-700 text-[#0059bb] dark:text-sky-300 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Nguyên âm đơn (12)
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("diphthong")}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === "diphthong"
                  ? "bg-white dark:bg-slate-700 text-purple-600 dark:text-purple-300 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Nguyên âm đôi (8)
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("consonant")}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === "consonant"
                  ? "bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-300 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Phụ âm (24)
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("minimal_pairs")}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === "minimal_pairs"
                  ? "bg-white dark:bg-slate-700 text-amber-600 dark:text-amber-300 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Cặp âm đối chiếu (12)
            </button>
          </div>

          {/* Search Box (Active for grid tabs) */}
          {activeTab !== "minimal_pairs" && (
            <div className="relative min-w-[220px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm âm (i:, th) hoặc từ (sheep)..."
                className="w-full pl-9 pr-8 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0059bb]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}
        </div>

        {/* 3. MAIN WORKSPACE CONTENT */}
        {activeTab === "minimal_pairs" ? (
          /* MINIMAL PAIRS TRAINER VIEW */
          <IpaMinimalPairsTrainer onPlaySound={handlePlaySound} />
        ) : (
          /* 44 SOUNDS INTERACTIVE GRID + SOUND INSPECTOR */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left/Main Column: Sound Cards Grid (7-8 Columns) */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-4">
              {filteredSounds.length === 0 ? (
                <div className="p-12 text-center rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-white/5 space-y-2">
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
                    Không tìm thấy âm nào khớp với từ khóa "{searchQuery}"
                  </p>
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="text-xs font-bold text-[#0059bb] hover:underline cursor-pointer"
                  >
                    Xóa bộ lọc tìm kiếm
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 sm:gap-3">
                  {filteredSounds.map((sound) => (
                    <IpaSoundCard
                      key={sound.id}
                      sound={sound}
                      isSelected={selectedSound?.id === sound.id}
                      isPlaying={playingSoundId === sound.id}
                      onSelect={handleSelectSound}
                      onPlayAudio={handleCardPlayAudio}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Right Column: Sticky Sound Inspector & Speech Lab (4-5 Columns) */}
            <div
              id="ipa-sound-inspector-pane"
              className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-6 space-y-4"
            >
              <IpaSoundInspector
                sound={selectedSound}
                onPlaySound={handlePlaySound}
              />
            </div>
          </div>
        )}
      </div>
    </PageEntranceWrapper>
  );
}
