"use client";

import React from "react";
import { Volume2, Heart, Zap } from "lucide-react";

export interface VocabItemData {
  id: string;
  word: string;
  pos: string;
  phonetic?: string;
  definitionVn: string;
  definition?: string;
  examples?: string[];
}

export interface VocabCardItemProps {
  vocab: VocabItemData;
  isLearned?: boolean;
  isFavorite?: boolean;
  proficiency?: number;
  onSpeak: (word: string) => void;
  onToggleFavorite: (id: string) => void;
  onPractice: (id: string) => void;
}

export function VocabCardItem({
  vocab,
  isLearned = false,
  isFavorite = false,
  proficiency = 0,
  onSpeak,
  onToggleFavorite,
  onPractice,
}: VocabCardItemProps) {
  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs hover:shadow-xl hover:border-[#0059bb]/50 transition-all duration-300 flex flex-col justify-between h-full space-y-3 group relative overflow-hidden">
      <div className="space-y-2">
        {/* Upper row: Word title, POS & Action tools */}
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h3 className="text-base font-bold text-slate-900 dark:text-white font-display truncate group-hover:text-[#0059bb] dark:group-hover:text-sky-400 transition-colors">
                {vocab.word}
              </h3>
              <span className="text-[10px] bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-300 px-2 py-0.5 rounded-md font-mono font-bold uppercase shrink-0">
                {vocab.pos}
              </span>
              {isLearned && (
                <span className="text-[10px] bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-md font-mono font-bold border border-emerald-200/60 dark:border-emerald-800/40 shrink-0">
                  ✓ thuộc
                </span>
              )}
            </div>
            {vocab.phonetic && (
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium tracking-wide mt-0.5 truncate">
                {vocab.phonetic}
              </div>
            )}
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={() => onSpeak(vocab.word)}
              className="w-8 h-8 rounded-xl text-slate-400 hover:text-[#0059bb] dark:hover:text-sky-400 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center transition-colors cursor-pointer"
              title="Phát âm từ"
            >
              <Volume2 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onToggleFavorite(vocab.id)}
              className="w-8 h-8 rounded-xl text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center transition-colors cursor-pointer"
              title="Thêm yêu thích"
            >
              <Heart
                className={`w-4 h-4 ${
                  isFavorite ? "text-rose-500 fill-rose-500" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* Highlighted Primary Vietnamese Translation */}
        <div className="text-sm font-bold text-[#0059bb] dark:text-sky-400 line-clamp-1 font-display">
          {vocab.definitionVn}
        </div>

        {/* English Definition */}
        {vocab.definition && (
          <div className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2 font-medium">
            {vocab.definition}
          </div>
        )}

        {/* Example Sentence */}
        {vocab.examples?.[0] && (
          <div className="text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-950 p-2.5 rounded-xl border border-slate-200/60 dark:border-slate-800 line-clamp-2 mt-1">
            &quot;{vocab.examples[0]}&quot;
          </div>
        )}
      </div>

      {/* Card Footer: Proficiency Stars & Action Button */}
      <div className="flex items-center justify-between pt-2.5 border-t border-slate-100 dark:border-slate-800/80">
        <div className="flex items-center gap-1">
          {Array(5)
            .fill(0)
            .map((_, idx) => (
              <div
                key={idx}
                className={`w-1.5 h-1.5 rounded-full ${
                  idx < proficiency
                    ? "bg-emerald-500"
                    : "bg-slate-200 dark:bg-slate-800"
                }`}
              />
            ))}
        </div>

        <button
          type="button"
          onClick={() => onPractice(vocab.id)}
          className="h-7 px-3 rounded-lg bg-[#0059bb] hover:bg-[#004899] text-white text-[11px] font-bold shadow-2xs transition-all active:scale-95 flex items-center gap-1 cursor-pointer"
        >
          <Zap className="w-3 h-3 fill-current" />
          <span>Luyện</span>
        </button>
      </div>
    </div>
  );
}
