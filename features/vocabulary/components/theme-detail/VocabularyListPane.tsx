"use client";

import React from "react";
import { motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { VocabCardItem, VocabItemData } from "../shared/VocabCardItem";
import { containerVariants, itemVariants } from "@/shared/components/feedback/PageEntranceAnimation";

export interface VocabularyListPaneProps {
  vocabs: VocabItemData[];
  filteredVocabs: VocabItemData[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filterStatus: "all" | "unlearned" | "learned" | "favorite";
  setFilterStatus: (status: "all" | "unlearned" | "learned" | "favorite") => void;
  unlearnedCount: number;
  learnedCount: number;
  favoriteCount: number;
  learnedState: {
    vocabId: string;
    isLearned?: boolean;
    isFavorite?: boolean;
    proficiency?: number;
  }[];
  onSpeak: (word: string) => void;
  onToggleFavorite: (id: string) => void;
  onPractice: (id: string) => void;
}

export function VocabularyListPane({
  vocabs,
  filteredVocabs,
  searchQuery,
  setSearchQuery,
  filterStatus,
  setFilterStatus,
  unlearnedCount,
  learnedCount,
  favoriteCount,
  learnedState,
  onSpeak,
  onToggleFavorite,
  onPractice,
}: VocabularyListPaneProps) {
  return (
    <div className="space-y-4">
      {/* Search & Filter Toolbar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search Box */}
        <div className="relative w-full md:w-80 shrink-0">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm từ vựng, phiên âm hoặc nghĩa..."
            className="w-full h-10 pl-10 pr-8 text-xs font-medium rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/90 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#0059bb]/20 focus:border-[#0059bb] transition-all shadow-2xs"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filter Status Chips */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {[
            { id: "all" as const, label: `Tất cả (${vocabs.length})` },
            { id: "unlearned" as const, label: `Chưa thuộc (${unlearnedCount})` },
            { id: "learned" as const, label: `Đã thuộc (${learnedCount})` },
            { id: "favorite" as const, label: `Yêu thích (${favoriteCount})` },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilterStatus(tab.id)}
              className={`h-9 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap active:scale-95 ${
                filterStatus === tab.id
                  ? "bg-[#0059bb] text-white shadow-md shadow-[#0059bb]/20 font-display"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Cards Grid */}
      {filteredVocabs.length === 0 ? (
        <div className="p-8 sm:p-12 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">
            Không tìm thấy từ vựng nào phù hợp
          </h3>
          <p className="text-xs text-slate-500">
            Thử thay đổi từ khóa hoặc chọn trạng thái lọc &ldquo;Tất cả&rdquo; ở thanh công cụ.
          </p>
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4"
        >
          {filteredVocabs.map((v) => {
            const state = learnedState.find((l) => l.vocabId === v.id);
            const isFav = state?.isFavorite || false;
            const prof = state?.proficiency || 0;
            const isLearned = state?.isLearned || false;

            return (
              <motion.div key={v.id} variants={itemVariants}>
                <VocabCardItem
                  vocab={v}
                  isLearned={isLearned}
                  isFavorite={isFav}
                  proficiency={prof}
                  onSpeak={onSpeak}
                  onToggleFavorite={onToggleFavorite}
                  onPractice={onPractice}
                />
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}
