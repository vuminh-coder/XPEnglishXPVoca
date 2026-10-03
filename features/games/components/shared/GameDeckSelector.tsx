"use client";

import React, { useState, useEffect } from "react";
import {
  Globe,
  Briefcase,
  GraduationCap,
  Bookmark,
  RefreshCw,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import { useVocabularyStore } from "@/stores/vocabularyStore";
import { VocabDeckType } from "../../types";

export interface GameDeckSelectorProps {
  currentDeck: VocabDeckType;
  onSelectDeck: (deck: VocabDeckType) => void;
  poolCount?: number;
}

export function GameDeckSelector({
  currentDeck,
  onSelectDeck,
  poolCount = 0,
}: GameDeckSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const learned = useVocabularyStore((s) => s.learned);

  const bookmarkedCount = learned.filter((w) => w.isFavorite).length;
  const weakCount = learned.filter((w) => (w.proficiency || (w as any).masteryLevel || 0) <= 2).length;


  const decks = [
    {
      id: "all" as VocabDeckType,
      label: "Tất Cả Từ Vựng",
      subtitle: "Tổng hợp phong phú A1 ~ C1",
      icon: Globe,
      color: "text-blue-600 dark:text-sky-400",
      bg: "bg-blue-50 dark:bg-blue-950/40",
      badge: "Mặc định",
    },
    {
      id: "toeic" as VocabDeckType,
      label: "Mục Tiêu TOEIC",
      subtitle: "Giao tiếp công sở & kinh doanh",
      icon: Briefcase,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-950/40",
      badge: "TOEIC 650+",
    },
    {
      id: "ielts" as VocabDeckType,
      label: "Học Thuật IELTS",
      subtitle: "Từ vựng Academic & Nghiên cứu B2-C1",
      icon: GraduationCap,
      color: "text-indigo-600 dark:text-indigo-400",
      bg: "bg-indigo-50 dark:bg-indigo-950/40",
      badge: "IELTS 6.5+",
    },
    {
      id: "bookmarks" as VocabDeckType,
      label: "Sổ Tay Yêu Thích",
      subtitle: `${bookmarkedCount} từ bạn đã đánh dấu sao`,
      icon: Bookmark,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-950/40",
      badge: `${bookmarkedCount} từ`,
    },
    {
      id: "weak" as VocabDeckType,
      label: "Từ Hay Quên Cần Ôn",
      subtitle: `${weakCount} từ độ thuần thục chưa cao`,
      icon: RefreshCw,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-950/40",
      badge: `${weakCount} từ`,
    },
  ];

  const activeDeckObj = decks.find((d) => d.id === currentDeck) || decks[0];
  const ActiveIcon = activeDeckObj.icon;

  return (
    <div className="relative inline-block text-left select-none">
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold text-slate-500 dark:text-slate-400 hidden sm:inline">
          Kho từ vựng:
        </span>

        <button
          type="button"
          onClick={() => setIsOpen((o) => !o)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-label={`Chọn kho từ vựng: ${activeDeckObj.label}`}
          className="py-1.5 px-3 min-h-[40px] rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/90 dark:border-slate-700/80 hover:border-[#0059bb] transition-all cursor-pointer flex items-center gap-2 shadow-2xs active:scale-95"
        >
          <div
            className={`w-6 h-6 rounded-lg ${activeDeckObj.bg} ${activeDeckObj.color} flex items-center justify-center shrink-0`}
          >
            <ActiveIcon className="w-3.5 h-3.5 stroke-[2.2]" />
          </div>

          <div className="text-left">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1">
              {activeDeckObj.label}
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-0.5" />
            </span>
          </div>
        </button>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-slate-950/20 backdrop-blur-[2px] transition-all"
            onClick={() => setIsOpen(false)}
            onKeyDown={(e) => { if (e.key === "Escape") setIsOpen(false); }}
            role="presentation"
          />

          <div role="listbox" aria-label="Danh sách kho từ vựng" className="absolute right-0 mt-2 w-72 sm:w-80 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xl shadow-slate-900/15 dark:shadow-black/50 z-50 p-2 space-y-1 animate-in fade-in zoom-in-95 duration-150">
            <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800/80">
              <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-[#0059bb]" />
                Chọn bộ từ đưa vào ván game
              </span>
            </div>

            {decks.map((deck) => {
              const Icon = deck.icon;
              const isSelected = deck.id === currentDeck;

              return (
                <button
                  key={deck.id}
                  type="button"
                  onClick={() => {
                    onSelectDeck(deck.id);
                    setIsOpen(false);
                  }}
                  className={`w-full p-2.5 rounded-2xl text-left flex items-center justify-between gap-3 transition-all cursor-pointer ${
                    isSelected
                      ? "bg-blue-50/80 dark:bg-blue-950/50 border border-blue-200/80 dark:border-blue-800/60"
                      : "hover:bg-slate-50 dark:hover:bg-slate-800/60 border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className={`w-8 h-8 rounded-xl ${deck.bg} ${deck.color} flex items-center justify-center shrink-0`}
                    >
                      <Icon className="w-4 h-4 stroke-[2.2]" />
                    </div>

                    <div className="min-w-0">
                      <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {deck.label}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                        {deck.subtitle}
                      </div>
                    </div>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded-lg text-[10px] font-extrabold uppercase shrink-0 ${
                      isSelected
                        ? "bg-[#0059bb] text-white"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                    }`}
                  >
                    {deck.badge}
                  </span>
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
