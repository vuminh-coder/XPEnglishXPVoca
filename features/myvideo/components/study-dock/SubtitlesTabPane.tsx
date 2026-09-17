"use client";
import React, { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { List, Eye, Clock, Play } from "lucide-react";
import { YouTubeVideoItem } from "@/stores/videoStore";
import { WordLookupCard, WordLookupData } from "../shared/WordLookupCard";

export interface SubtitlesTabPaneProps {
  activeVideo: YouTubeVideoItem;
  subViewMode: "rolling" | "full";
  setSubViewMode: (mode: "rolling" | "full") => void;
  activeSubIndex: number;
  activeWordIndex: number;
  isCueSpeaking: boolean;
  handleSeekTo: (seconds: number, index: number) => void;
  handleWordClick: (word: string) => void;
  wordLookupData: WordLookupData | null;
  setWordLookupData: (data: any) => void;
  handleSaveWordToNotebook: () => void;
}

function formatSubTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return "00:00";
  const totalSec = Math.floor(seconds);
  const mins = Math.floor(totalSec / 60);
  const secs = totalSec % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

export function SubtitlesTabPane({
  activeVideo,
  subViewMode,
  setSubViewMode,
  activeSubIndex,
  activeWordIndex,
  isCueSpeaking,
  handleSeekTo,
  handleWordClick,
  wordLookupData,
  setWordLookupData,
  handleSaveWordToNotebook,
}: SubtitlesTabPaneProps) {
  const subItemRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  useEffect(() => {
    if (subViewMode === "full" && subItemRefs.current[activeSubIndex]) {
      subItemRefs.current[activeSubIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [activeSubIndex, subViewMode]);

  return (
    <div className="space-y-3">
      {/* Word Lookup Popup Card */}
      <WordLookupCard
        wordLookupData={wordLookupData}
        onSpeakWord={handleWordClick}
        onSaveWord={handleSaveWordToNotebook}
        onClose={() => setWordLookupData(null)}
      />

      {/* Subtitle Mode Switcher Header */}
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
          CLICK CÂU ĐỂ NHẢY VIDEO · CLICK TỪ ĐỂ TRA VÀ LƯU
        </span>
        <button
          type="button"
          onClick={() => setSubViewMode(subViewMode === "rolling" ? "full" : "rolling")}
          className="px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-[#0059bb] text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-all border border-slate-200 dark:border-slate-700"
          title={subViewMode === "rolling" ? "Xem toàn bộ phụ đề" : "Chế độ focus 3 câu"}
        >
          {subViewMode === "rolling" ? (
            <>
              <List className="w-3 h-3" /> Xem Tất Cả
            </>
          ) : (
            <>
              <Eye className="w-3 h-3" /> Focus 3 Câu
            </>
          )}
        </button>
      </div>

      {/* MODE 1: 3-SENTENCE ROLLING VIEWPORT */}
      {subViewMode === "rolling" && (
        <div className="space-y-3 relative min-h-[320px] p-0.5">
          <AnimatePresence mode="popLayout">
            {[activeSubIndex, activeSubIndex + 1, activeSubIndex + 2].map((cueIndex, pos) => {
              const sub = activeVideo.subtitles[cueIndex];
              if (!sub) return null;

              const isFocused = pos === 0;
              const isActiveSpeaking = isFocused && isCueSpeaking;
              const isNext1 = pos === 1;

              return (
                <motion.div
                  key={sub.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{
                    opacity: isActiveSpeaking ? 1 : isFocused ? 0.9 : isNext1 ? 0.72 : 0.48,
                    scale: isActiveSpeaking ? 1 : isFocused ? 0.99 : isNext1 ? 0.98 : 0.96,
                    y: 0,
                  }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.22, ease: [0.25, 1, 0.5, 1] }}
                  onClick={() => handleSeekTo(sub.startTime, cueIndex)}
                  className={`p-3.5 sm:p-4 rounded-xl border transition-all cursor-pointer space-y-2 ${
                    isActiveSpeaking
                      ? "bg-blue-50/80 dark:bg-blue-950/50 border-[#0059bb] ring-1 ring-[#0059bb]/20 shadow-sm"
                      : isFocused
                      ? "bg-slate-50/90 dark:bg-slate-900/60 border-blue-200 dark:border-blue-900/40 shadow-2xs"
                      : "bg-slate-50/70 dark:bg-slate-950/40 border-slate-200/60 dark:border-slate-800 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center justify-between text-xs sm:text-sm font-mono border-b border-slate-200/40 dark:border-slate-800 pb-1.5">
                    <span className="flex items-center gap-1.5 font-bold text-slate-600 dark:text-slate-300">
                      <Clock className="w-4 h-4 text-[#0059bb]" /> {formatSubTime(sub.startTime)}
                    </span>
                    {isActiveSpeaking ? (
                      <span className="p-1 rounded-md bg-blue-100 dark:bg-blue-900/40 border border-[#0059bb]/30 text-[#0059bb] dark:text-sky-400 flex items-center justify-center shadow-2xs">
                        <Play className="w-3.5 h-3.5 fill-current text-[#0059bb] dark:text-sky-400" />
                      </span>
                    ) : isFocused ? (
                      <span className="text-[10px] font-bold text-blue-600 dark:text-sky-400 bg-blue-50 dark:bg-blue-950/60 px-1.5 py-0.5 rounded border border-blue-200/60 dark:border-blue-800/60 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                        Sắp phát
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-slate-400">
                        {isNext1 ? "[CÂU TIẾP THEO 1]" : "[CÂU TIẾP THEO 2]"}
                      </span>
                    )}
                  </div>

                  {/* Karaoke Words Line with Amber Glow Highlight */}
                  <div className="flex flex-wrap items-center gap-1 sm:gap-1.5 pt-0.5">
                    {sub.textEn.split(/\s+/).filter(Boolean).map((word, wordIdx) => {
                      const isKaraokeFocused = isActiveSpeaking && wordIdx === activeWordIndex;
                      const isPastWord = isActiveSpeaking && wordIdx < activeWordIndex;

                      return (
                        <button
                          key={wordIdx}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleWordClick(word);
                          }}
                          className={`px-1.5 py-0.5 rounded-md text-xs sm:text-sm transition-all cursor-pointer font-sans ${
                            isKaraokeFocused
                              ? "bg-amber-400 text-slate-950 font-black shadow-md ring-2 ring-amber-300/60 scale-105"
                              : isPastWord
                              ? "text-[#0059bb] dark:text-sky-400 font-bold"
                              : "text-slate-900 dark:text-white font-semibold hover:bg-blue-100 dark:hover:bg-slate-800"
                          }`}
                        >
                          {word}
                        </button>
                      );
                    })}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium pt-0.5">
                    {sub.textVn}
                  </p>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      {/* MODE 2: FULL SUBTITLE LIST VIEW */}
      {subViewMode === "full" && (
        <div className="space-y-3">
          {activeVideo.subtitles.map((sub, i) => {
            const isCardSelected = activeSubIndex === i;
            const isCardSpeaking = isCardSelected && isCueSpeaking;

            return (
              <div
                key={sub.id}
                ref={(el) => {
                  subItemRefs.current[i] = el;
                }}
                onClick={() => handleSeekTo(sub.startTime, i)}
                className={`p-3.5 sm:p-4 rounded-xl border transition-all cursor-pointer space-y-2 ${
                  isCardSpeaking
                    ? "bg-blue-50/80 dark:bg-blue-950/40 border-[#0059bb] ring-1 ring-[#0059bb]/20 shadow-sm"
                    : isCardSelected
                    ? "bg-slate-50 dark:bg-slate-900 border-blue-200 dark:border-blue-900/40 shadow-2xs"
                    : "bg-slate-50 dark:bg-slate-950 border-slate-200/60 dark:border-slate-800 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center justify-between text-xs sm:text-sm font-mono border-b border-slate-200/40 dark:border-slate-800 pb-1.5">
                  <span className="flex items-center gap-1.5 font-bold text-slate-600 dark:text-slate-300">
                    <Clock className="w-4 h-4 text-[#0059bb] dark:text-sky-400" /> {formatSubTime(sub.startTime)}
                  </span>
                  {isCardSpeaking ? (
                    <span className="p-1 rounded-md bg-blue-100/80 dark:bg-blue-900/40 border border-[#0059bb]/30 text-[#0059bb] dark:text-sky-400 flex items-center justify-center">
                      <Play className="w-3.5 h-3.5 fill-current text-[#0059bb] dark:text-sky-400" />
                    </span>
                  ) : isCardSelected ? (
                    <span className="text-[10px] font-bold text-blue-600 dark:text-sky-400 bg-blue-50 dark:bg-blue-950/60 px-1.5 py-0.5 rounded border border-blue-200/60 dark:border-blue-800/60">
                      Sắp phát
                    </span>
                  ) : null}
                </div>

                <div className="flex flex-wrap items-center gap-1 sm:gap-1.5 pt-0.5">
                  {sub.textEn.split(/\s+/).filter(Boolean).map((w, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleWordClick(w);
                      }}
                      className="px-1.5 py-0.5 rounded-md hover:bg-blue-100 dark:hover:bg-blue-950 hover:text-[#0059bb] text-slate-900 dark:text-white text-xs sm:text-sm font-semibold transition-all cursor-pointer"
                    >
                      {w}
                    </button>
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium pt-0.5">
                  {sub.textVn}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
