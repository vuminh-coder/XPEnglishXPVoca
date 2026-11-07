"use client";
import React, { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { List, Eye, Clock, Volume2, Sparkles } from "lucide-react";
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
  setWordLookupData: (data: WordLookupData | null) => void;
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
    const targetEl = subItemRefs.current[activeSubIndex];
    if (subViewMode === "full" && targetEl) {
      const scrollContainer = targetEl.closest(".overflow-y-auto") as HTMLElement | null;
      if (scrollContainer) {
        const containerRect = scrollContainer.getBoundingClientRect();
        const itemRect = targetEl.getBoundingClientRect();
        const relativeTop = itemRect.top - containerRect.top + scrollContainer.scrollTop;
        const desiredScrollTop = Math.max(0, relativeTop - scrollContainer.clientHeight * 0.25);
        scrollContainer.scrollTo({
          top: desiredScrollTop,
          behavior: "smooth",
        });
      }
    }
  }, [activeSubIndex, subViewMode]);

  const hasAiSubtitles = activeVideo.subtitles.some(
    (s) => s.id.startsWith("ai_") || (s as any).isAiGenerated
  );

  return (
    <div className="space-y-2.5">
      {/* Word Lookup Popup Card */}
      <WordLookupCard
        wordLookupData={wordLookupData}
        onSpeakWord={handleWordClick}
        onSaveWord={handleSaveWordToNotebook}
        onClose={() => setWordLookupData(null)}
      />

      {/* Subtitle Mode Switcher Header — Always 1 Single Sleek Line */}
      <div className="flex items-center justify-between gap-2 overflow-hidden py-0.5">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 truncate whitespace-nowrap">
            Chạm câu để phát · Chạm từ để tra
          </span>
          {hasAiSubtitles && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 border border-purple-200/60 dark:border-purple-800/50 text-xs font-bold shrink-0">
              <Sparkles className="w-3 h-3" />
              <span>Gemini AI</span>
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={() => setSubViewMode(subViewMode === "rolling" ? "full" : "rolling")}
          className="shrink-0 whitespace-nowrap px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 hover:text-[#0059bb] dark:text-slate-300 dark:hover:text-sky-400 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all border border-slate-200/80 dark:border-slate-700/60 shadow-2xs"
          title={subViewMode === "rolling" ? "Xem toàn bộ phụ đề" : "Chế độ 3 câu"}
        >
          {subViewMode === "rolling" ? (
            <>
              <List className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400" />
              <span>Xem Tất Cả</span>
            </>
          ) : (
            <>
              <Eye className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400" />
              <span>Chế Độ 3 Câu</span>
            </>
          )}
        </button>
      </div>

      {/* MODE 1: 3-SENTENCE ROLLING VIEWPORT */}
      {subViewMode === "rolling" && (
        <div className="space-y-2.5 relative min-h-[260px] p-0.5">
          <AnimatePresence mode="popLayout" initial={false}>
            {[activeSubIndex, activeSubIndex + 1, activeSubIndex + 2].map((cueIndex, pos) => {
              const sub = activeVideo.subtitles[cueIndex];
              if (!sub) return null;

              const isFocused = pos === 0;
              const isActiveSpeaking = isFocused && isCueSpeaking;
              const isNext1 = pos === 1;

              return (
                <motion.div
                  key={sub.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{
                    opacity: isActiveSpeaking ? 1 : isFocused ? 1 : isNext1 ? 0.88 : 0.76,
                    scale: isActiveSpeaking ? 1 : isFocused ? 1 : isNext1 ? 0.99 : 0.98,
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
                    {isActiveSpeaking && (
                      <Volume2 className="w-4 h-4 animate-pulse text-[#0059bb] dark:text-sky-400" />
                    )}
                  </div>

                  {/* Karaoke Words Line with Amber Glow Highlight */}
                  <div className="flex flex-wrap items-center gap-1 sm:gap-1.5 pt-0.5">
                    {sub.textEn.split(/\s+/).filter(Boolean).map((word, wordIdx) => {
                      const isKaraokeFocused = isActiveSpeaking && wordIdx === activeWordIndex;
                      const isPastWord = isActiveSpeaking && wordIdx < activeWordIndex;

                      return (
                        <button
                          key={`${sub.id}_w_${wordIdx}`}
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
                  {isCardSpeaking && (
                    <Volume2 className="w-4 h-4 animate-pulse text-[#0059bb] dark:text-sky-400" />
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-1 sm:gap-1.5 pt-0.5">
                  {sub.textEn.split(/\s+/).filter(Boolean).map((w, idx) => {
                    const isKaraokeFocused = isCardSpeaking && idx === activeWordIndex;
                    const isPastWord = isCardSpeaking && idx < activeWordIndex;

                    return (
                      <button
                        key={`${sub.id}_full_w_${idx}`}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleWordClick(w);
                        }}
                        className={`px-1.5 py-0.5 rounded-md text-xs sm:text-sm font-sans transition-all cursor-pointer ${
                          isKaraokeFocused
                            ? "bg-amber-400 text-slate-950 font-black shadow-md ring-2 ring-amber-300/60 scale-105"
                            : isPastWord
                            ? "text-[#0059bb] dark:text-sky-400 font-bold"
                            : "hover:bg-blue-100 dark:hover:bg-blue-950 hover:text-[#0059bb] text-slate-900 dark:text-white font-semibold"
                        }`}
                      >
                        {w}
                      </button>
                    );
                  })}
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
