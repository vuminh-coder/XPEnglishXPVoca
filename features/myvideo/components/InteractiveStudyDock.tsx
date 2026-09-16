"use client";
import React, { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Brain,
  ListVideo,
  Volume2,
  BookmarkPlus,
  X,
  List,
  Eye,
  Clock,
  Play,
  Target,
  HelpCircle,
  Sparkles,
  Mic,
  Award,
} from "lucide-react";
import { YouTubeVideoItem, SubtitleSentence } from "@/stores/videoStore";

interface InteractiveStudyDockProps {
  activeVideo: YouTubeVideoItem;
  savedVideos: YouTubeVideoItem[];
  rightPanelTab: "subtitles" | "dictation" | "playlist";
  setRightPanelTab: (tab: "subtitles" | "dictation" | "playlist") => void;
  // Subtitles Tab Props
  wordLookupData: {
    word: string;
    phonetic: string;
    pos: string;
    definitionVn: string;
  } | null;
  setWordLookupData: (data: any) => void;
  handleWordClick: (word: string) => void;
  handleSaveWordToNotebook: () => void;
  subViewMode: "rolling" | "full";
  setSubViewMode: (mode: "rolling" | "full") => void;
  activeSubIndex: number;
  activeWordIndex: number;
  isCueSpeaking: boolean;
  handleSeekTo: (seconds: number, index: number) => void;
  // Dictation Tab Props
  currentSubIndex: number;
  setCurrentSubIndex: (idx: number) => void;
  dictationInput: string;
  setDictationInput: (val: string) => void;
  dictationAnswered: boolean;
  dictationCorrect: boolean | null;
  showHint: boolean;
  setShowHint: (show: boolean) => void;
  handleCheckDictation: () => void;
  handleNextDictation: () => void;
  // Shadowing Tab Props
  isRecording: boolean;
  waveformBars: number[];
  shadowingScore: number | null;
  toggleShadowingRecord: () => void;
  // Playlist Tab Props
  onSelectVideo: (video: YouTubeVideoItem) => void;
}

function formatSubTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return "00:00";
  const totalSec = Math.floor(seconds);
  const mins = Math.floor(totalSec / 60);
  const secs = totalSec % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function maskDictationWord(textEn: string, dictationWord: string): string {
  if (!textEn) return "";
  if (!dictationWord) return textEn;
  const escaped = dictationWord.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const boundaryRegex = new RegExp(`\\b${escaped}\\b`, "gi");
  if (boundaryRegex.test(textEn)) {
    return textEn.replace(boundaryRegex, " [ _____ ] ");
  }
  const substringRegex = new RegExp(escaped, "gi");
  if (substringRegex.test(textEn)) {
    return textEn.replace(substringRegex, " [ _____ ] ");
  }
  return textEn;
}

export const InteractiveStudyDock: React.FC<InteractiveStudyDockProps> = ({
  activeVideo,
  savedVideos,
  rightPanelTab,
  setRightPanelTab,
  wordLookupData,
  setWordLookupData,
  handleWordClick,
  handleSaveWordToNotebook,
  subViewMode,
  setSubViewMode,
  activeSubIndex,
  activeWordIndex,
  isCueSpeaking,
  handleSeekTo,
  currentSubIndex,
  setCurrentSubIndex,
  dictationInput,
  setDictationInput,
  dictationAnswered,
  dictationCorrect,
  showHint,
  setShowHint,
  handleCheckDictation,
  handleNextDictation,
  isRecording,
  waveformBars,
  shadowingScore,
  toggleShadowingRecord,
  onSelectVideo,
}) => {
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
    <div className="flex flex-col h-full">
      <div className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-md shadow-slate-200/50 dark:shadow-black/40 overflow-hidden flex flex-col h-full min-h-0">
        {/* Header Tabs Segmented Dock */}
        <div className="p-1.5 bg-slate-100 dark:bg-slate-800/80 border-b border-slate-200/80 dark:border-slate-800 grid grid-cols-3 gap-1 shrink-0">
          <button
            type="button"
            onClick={() => setRightPanelTab("subtitles")}
            className={`py-2 rounded-lg text-xs font-bold font-display transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              rightPanelTab === "subtitles"
                ? "bg-white dark:bg-slate-900 text-[#0059bb] dark:text-sky-400 shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" /> Phụ Đề Tra Từ
          </button>
          <button
            type="button"
            onClick={() => setRightPanelTab("dictation")}
            className={`py-2 rounded-lg text-xs font-bold font-display transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              rightPanelTab === "dictation"
                ? "bg-white dark:bg-slate-900 text-[#0059bb] dark:text-sky-400 shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Brain className="w-3.5 h-3.5 text-purple-500" /> Dictation AI
          </button>
          <button
            type="button"
            onClick={() => setRightPanelTab("playlist")}
            className={`py-2 rounded-lg text-xs font-bold font-display transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              rightPanelTab === "playlist"
                ? "bg-white dark:bg-slate-900 text-[#0059bb] dark:text-sky-400 shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <ListVideo className="w-3.5 h-3.5" /> Playlist ({savedVideos.length})
          </button>
        </div>

        {/* Scrollable Content Container */}
        <div className="p-3.5 sm:p-4 space-y-3 overflow-y-auto flex-1 min-h-0">
          {/* TAB 1: PHỤ ĐỀ SONG NGỮ 1-CLICK TRA TỪ */}
          {rightPanelTab === "subtitles" && (
            <div className="space-y-3">
              {/* Word Lookup Popup Card */}
              <AnimatePresence>
                {wordLookupData && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.98 }}
                    className="sticky top-0 z-10 p-3.5 rounded-xl bg-[#0059bb] text-white shadow-lg space-y-2 border border-sky-400/20"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-black tracking-wide font-display text-white flex items-center gap-1.5">
                          <BookOpen className="w-4 h-4 text-amber-300" /> {wordLookupData.word}
                        </h4>
                        <span className="text-[11px] font-mono opacity-90 px-1.5 py-0.5 rounded bg-white/20">
                          {wordLookupData.phonetic}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleWordClick(wordLookupData.word)}
                          className="p-1 rounded-full bg-white/20 hover:bg-white/30 text-white cursor-pointer transition-all"
                          title="Phát âm từ này"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={handleSaveWordToNotebook}
                          className="px-2.5 py-1 rounded-lg bg-white text-[#0059bb] hover:bg-sky-50 text-[11px] font-black transition-all flex items-center gap-1 shadow-2xs cursor-pointer font-sans"
                        >
                          <BookmarkPlus className="w-3.5 h-3.5" /> + Lưu Notebook
                        </button>
                        <button
                          type="button"
                          onClick={() => setWordLookupData(null)}
                          className="p-1 rounded bg-white/20 hover:bg-white/30 text-white cursor-pointer"
                          title="Đóng tra từ"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <p className="text-xs font-bold opacity-95">
                      Nghĩa: {wordLookupData.definitionVn}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

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
          )}

          {/* TAB 2: DICTATION & SHADOWING AI */}
          {rightPanelTab === "dictation" && (
            <div className="space-y-3.5">
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 font-mono">
                <span>
                  CÂU HỎI {currentSubIndex + 1} / {activeVideo.subtitles.length}
                </span>
                {currentSubIndex !== activeSubIndex && (
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentSubIndex(activeSubIndex);
                      setDictationInput("");
                      setShowHint(false);
                    }}
                    className="text-[11px] font-bold text-[#0059bb] dark:text-sky-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Target className="w-3 h-3 text-[#0059bb] dark:text-sky-400" /> Nhảy tới câu đang phát (#{activeSubIndex + 1})
                  </button>
                )}
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 space-y-2 text-center shadow-2xs">
                <p className="text-sm font-bold text-slate-900 dark:text-white font-display leading-relaxed">
                  “{maskDictationWord(
                    activeVideo.subtitles[currentSubIndex]?.textEn || "",
                    activeVideo.subtitles[currentSubIndex]?.dictationWord || ""
                  )}”
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  Dịch: {activeVideo.subtitles[currentSubIndex]?.textVn}
                </p>
              </div>

              <div className="space-y-2.5">
                <label className="text-[10.5px] font-bold uppercase text-slate-400 dark:text-slate-500 block tracking-wider font-sans">
                  Điền từ còn thiếu vào ô bên dưới:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={dictationInput}
                    onChange={(e) => setDictationInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        if (!dictationAnswered && dictationInput.trim()) {
                          handleCheckDictation();
                        } else if (dictationAnswered) {
                          handleNextDictation();
                        }
                      }
                    }}
                    disabled={dictationAnswered}
                    autoComplete="off"
                    spellCheck={false}
                    placeholder="Gõ từ còn thiếu vào đây (Nhấn Enter)..."
                    className="flex-1 p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold text-center text-slate-900 dark:text-white focus:border-[#0059bb] focus:ring-1 focus:ring-[#0059bb] focus:outline-hidden"
                  />
                  <button
                    type="button"
                    onClick={() => setShowHint(!showHint)}
                    className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 border border-amber-200 dark:border-amber-800 text-xs font-bold cursor-pointer transition-all hover:bg-amber-100"
                    title="Gợi ý ký tự đầu"
                  >
                    <HelpCircle className="w-4 h-4" />
                  </button>
                </div>

                {showHint && activeVideo.subtitles[currentSubIndex] && (
                  <div className="p-2.5 rounded-xl bg-amber-50/90 text-amber-800 text-xs font-mono font-bold text-center flex items-center justify-center gap-1.5 border border-amber-200">
                    <Sparkles className="w-4 h-4 text-amber-600 shrink-0" /> Gợi ý: Bắt đầu bằng chữ cái &quot;
                    {activeVideo.subtitles[currentSubIndex].dictationWord.charAt(0).toUpperCase()}&quot; (Độ dài:{" "}
                    {activeVideo.subtitles[currentSubIndex].dictationWord.length} ký tự)
                  </div>
                )}

                {!dictationAnswered ? (
                  <button
                    type="button"
                    onClick={handleCheckDictation}
                    disabled={!dictationInput.trim()}
                    className="w-full py-2.5 rounded-xl bg-[#0059bb] hover:bg-[#004899] disabled:opacity-50 text-white text-xs font-bold transition-all shadow-md shadow-[#0059bb]/20 cursor-pointer font-sans active:scale-95"
                  >
                    Kiểm Tra Đáp Án (+20 XP)
                  </button>
                ) : (
                  <div className="space-y-2">
                    <div
                      className={`p-2.5 rounded-xl text-xs font-bold text-center ${
                        dictationCorrect
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-300"
                          : "bg-rose-50 text-rose-700 border border-rose-300"
                      }`}
                    >
                      {dictationCorrect
                        ? "✓ Đúng rồi! Bạn bắt âm rất chuẩn."
                        : `✗ Chưa đúng. Đáp án: "${activeVideo.subtitles[currentSubIndex]?.dictationWord}"`}
                    </div>

                    <button
                      type="button"
                      onClick={handleNextDictation}
                      className="w-full py-2.5 rounded-xl bg-[#0059bb] hover:bg-[#004899] text-white text-xs font-bold transition-all shadow-md shadow-[#0059bb]/20 cursor-pointer font-sans active:scale-95"
                    >
                      Câu tiếp theo ➔
                    </button>
                  </div>
                )}
              </div>

              {/* Shadowing AI Waveform Simulator Box */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-center space-y-2.5">
                <span className="text-[10.5px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-center gap-1.5">
                  <Mic className="w-3.5 h-3.5 text-rose-500" /> LUYỆN NHẠI GIỌNG SHADOWING AI
                </span>

                {/* Waveform visualizer */}
                <div className="flex items-center justify-center gap-1 h-8">
                  {waveformBars.map((h, i) => (
                    <div
                      key={i}
                      className={`w-1 rounded-full transition-all duration-150 ${
                        isRecording ? "bg-rose-500" : "bg-slate-300 dark:bg-slate-700"
                      }`}
                      style={{ height: `${isRecording ? h : 20}%` }}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={toggleShadowingRecord}
                  className={`w-11 h-11 rounded-xl mx-auto flex items-center justify-center text-white cursor-pointer transition-all shadow-md ${
                    isRecording
                      ? "bg-rose-600 animate-pulse shadow-rose-500/30"
                      : "bg-[#0059bb] hover:bg-[#004899] shadow-[#0059bb]/20"
                  }`}
                  title={isRecording ? "Dừng ghi âm và chấm điểm" : "Bắt đầu đọc nhại theo video"}
                >
                  <Mic className="w-5 h-5" />
                </button>

                {shadowingScore !== null && (
                  <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-700 text-xs font-bold flex items-center justify-center gap-1.5">
                    <Award className="w-4 h-4" /> AI Chấm Phát Âm: {shadowingScore}/100! (+15 XP)
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: PLAYLIST VIDEO ĐÃ LƯU */}
          {rightPanelTab === "playlist" && (
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block pb-1">
                DANH SÁCH BÀI HỌC CỦA BẠN ({savedVideos.length})
              </span>

              {savedVideos.map((vid) => (
                <button
                  key={vid.id}
                  type="button"
                  onClick={() => onSelectVideo(vid)}
                  className={`w-full p-2.5 rounded-xl border text-left flex items-center gap-3 transition-all cursor-pointer hover:-translate-y-0.5 ${
                    activeVideo.id === vid.id
                      ? "bg-blue-50/80 dark:bg-blue-950/40 border-[#0059bb] text-[#0059bb] dark:text-sky-400 shadow-sm"
                      : "bg-slate-50 dark:bg-slate-950 border-slate-200/70 dark:border-slate-800 hover:border-slate-300 text-slate-800 dark:text-slate-200"
                  }`}
                >
                  <img
                    src={vid.thumbnailUrl}
                    alt={vid.title}
                    className="w-16 aspect-video object-cover rounded-lg shrink-0 border border-slate-200/50 dark:border-slate-700/50"
                  />
                  <div className="min-w-0 flex-1 space-y-1">
                    <h4 className="text-xs font-bold truncate font-display leading-tight">
                      {vid.title}
                    </h4>
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono">
                      <span className="flex items-center gap-0.5">
                        <Clock className="w-3 h-3 text-slate-400" /> {vid.duration}
                      </span>
                      <span>• {vid.progressPercent}%</span>
                    </div>
                  </div>
                  {activeVideo.id === vid.id && (
                    <Play className="w-4 h-4 fill-current text-[#0059bb] dark:text-sky-400 shrink-0" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
