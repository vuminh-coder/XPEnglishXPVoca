"use client";
import React, { useState } from "react";
import {
  Target,
  HelpCircle,
  Sparkles,
  Mic,
  Award,
  PenTool,
  Volume2,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Check,
  X,
  Square,
  Play,
} from "lucide-react";
import { YouTubeVideoItem } from "@/stores/videoStore";

export interface DictationTabPaneProps {
  activeVideo: YouTubeVideoItem;
  currentSubIndex: number;
  setCurrentSubIndex: (idx: number) => void;
  activeSubIndex: number;
  dictationInput: string;
  setDictationInput: (val: string) => void;
  dictationAnswered: boolean;
  dictationCorrect: boolean | null;
  showHint: boolean;
  setShowHint: (show: boolean) => void;
  handleCheckDictation: () => void;
  handleNextDictation: () => void;
  isRecording: boolean;
  waveformBars: number[];
  shadowingScore: number | null;
  toggleShadowingRecord: () => void;
  handleSeekTo?: (seconds: number, index: number) => void;
}

function renderMaskedSentence({
  textEn,
  dictationWord,
  dictationInput,
  dictationAnswered,
  dictationCorrect,
}: {
  textEn: string;
  dictationWord: string;
  dictationInput: string;
  dictationAnswered: boolean;
  dictationCorrect: boolean | null;
}) {
  if (!textEn) return null;
  if (!dictationWord) {
    return <span>{textEn}</span>;
  }

  const escaped = dictationWord.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const wordBoundaryRegex = new RegExp(`(\\b${escaped}\\b)`, "gi");
  let parts = textEn.split(wordBoundaryRegex);

  // Fallback to substring regex if word boundary match failed
  if (parts.length <= 1) {
    parts = textEn.split(new RegExp(`(${escaped})`, "gi"));
  }

  return (
    <span>
      {parts.map((part, idx) => {
        if (part.toLowerCase() === dictationWord.toLowerCase()) {
          if (dictationAnswered) {
            if (dictationCorrect) {
              return (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 px-2 py-0.5 mx-1 rounded-lg bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300 font-bold border border-emerald-300 dark:border-emerald-700 shadow-2xs align-middle"
                >
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  {dictationWord}
                </span>
              );
            }
            return (
              <span
                key={idx}
                className="inline-flex items-center gap-1 px-2 py-0.5 mx-1 rounded-lg bg-rose-100 text-rose-800 dark:bg-rose-950/70 dark:text-rose-300 font-bold border border-rose-300 dark:border-rose-700 shadow-2xs align-middle"
              >
                <X className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                <span className="line-through opacity-75">{dictationInput || "..."}</span>
                <span className="text-emerald-700 dark:text-emerald-400 font-bold">→ {dictationWord}</span>
              </span>
            );
          }

          // Live typing preview
          if (dictationInput.trim().length > 0) {
            return (
              <span
                key={idx}
                className="inline-flex items-center px-2 py-0.5 mx-1 rounded-lg bg-amber-100/90 text-amber-900 dark:bg-amber-950/80 dark:text-amber-200 font-mono font-bold border border-amber-500 shadow-xs ring-2 ring-amber-400/20 align-middle transition-all"
              >
                {dictationInput}
              </span>
            );
          }

          // Empty placeholder pill
          return (
            <span
              key={idx}
              className="inline-flex items-center gap-1 px-2 py-0.5 mx-1 rounded-lg bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300 font-mono text-[11px] font-bold border border-dashed border-amber-400 dark:border-amber-600 shadow-2xs align-middle animate-pulse"
            >
              [ từ còn thiếu • {dictationWord.length} chữ ]
            </span>
          );
        }
        return <span key={idx}>{part}</span>;
      })}
    </span>
  );
}

export function DictationTabPane({
  activeVideo,
  currentSubIndex,
  setCurrentSubIndex,
  activeSubIndex,
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
  handleSeekTo,
}: DictationTabPaneProps) {
  const [studyMode, setStudyMode] = useState<"dictation" | "shadowing">("dictation");

  const totalSubs = activeVideo.subtitles?.length || 0;
  const currentSub = activeVideo.subtitles?.[currentSubIndex];

  // Chunking logic for 10-sentence micro-sessions
  const chunkSize = 10;
  const currentChunk = Math.floor(currentSubIndex / chunkSize) + 1;
  const totalChunks = Math.max(1, Math.ceil(totalSubs / chunkSize));
  const chunkProgress = (currentSubIndex % chunkSize) + 1;
  const chunkPercent = Math.min(100, Math.round((chunkProgress / chunkSize) * 100));

  const goToPrevSub = () => {
    if (currentSubIndex > 0) {
      setCurrentSubIndex(currentSubIndex - 1);
      setDictationInput("");
      setShowHint(false);
    }
  };

  const goToNextSub = () => {
    if (currentSubIndex < totalSubs - 1) {
      setCurrentSubIndex(currentSubIndex + 1);
      setDictationInput("");
      setShowHint(false);
    }
  };

  const playSlowAudio = (text: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  if (!currentSub || totalSubs === 0) {
    return (
      <div className="p-6 text-center text-xs font-semibold text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
        Video này chưa có phụ đề sẵn sàng cho bài tập. Vui lòng chọn video khác trong danh sách!
      </div>
    );
  }

  return (
    <div className="space-y-2.5">
      {/* 1. Sub-mode Segmented Control (Rule 14) */}
      <div className="grid grid-cols-2 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl text-xs font-bold font-sans">
        <button
          type="button"
          onClick={() => setStudyMode("dictation")}
          className={`py-1.5 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            studyMode === "dictation"
              ? "bg-white dark:bg-slate-900 text-[#0059bb] dark:text-sky-400 shadow-xs font-semibold"
              : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
          }`}
        >
          <PenTool className="w-3.5 h-3.5" />
          <span>Chép Chính Tả</span>
        </button>
        <button
          type="button"
          onClick={() => setStudyMode("shadowing")}
          className={`py-1.5 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            studyMode === "shadowing"
              ? "bg-white dark:bg-slate-900 text-[#0059bb] dark:text-sky-400 shadow-xs font-semibold"
              : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
          }`}
        >
          <Mic className="w-3.5 h-3.5 text-rose-500" />
          <span>Luyện Shadowing</span>
        </button>
      </div>

      {/* 2. Micro-session Progress & Stepper Bar */}
      <div className="flex flex-col gap-1 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 font-mono">
              Chặng {currentChunk}/{totalChunks} • Câu {chunkProgress}/10
            </span>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">
              (Tổng: {currentSubIndex + 1}/{totalSubs})
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={goToPrevSub}
              disabled={currentSubIndex === 0}
              title="Câu trước"
              className="p-1 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-200/70 dark:hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={goToNextSub}
              disabled={currentSubIndex >= totalSubs - 1}
              title="Câu tiếp theo"
              className="p-1 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-200/70 dark:hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#0059bb] dark:bg-sky-500 rounded-full transition-all duration-300"
            style={{ width: `${chunkPercent}%` }}
          />
        </div>

        {currentSubIndex !== activeSubIndex && (
          <div className="pt-0.5 flex justify-end">
            <button
              type="button"
              onClick={() => {
                setCurrentSubIndex(activeSubIndex);
                setDictationInput("");
                setShowHint(false);
              }}
              className="text-[10px] font-bold text-[#0059bb] dark:text-sky-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Target className="w-3 h-3 text-[#0059bb] dark:text-sky-400" /> Nhảy tới câu video đang phát (#{activeSubIndex + 1})
            </button>
          </div>
        )}
      </div>

      {/* 3. MODE 1: DICTATION CHÉP CHÍNH TẢ */}
      {studyMode === "dictation" && (
        <div className="space-y-2.5">
          {/* Sentence Card with Header Audio Utilities */}
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 space-y-2 shadow-2xs">
            <div className="flex items-center justify-between pb-1.5 border-b border-slate-200/60 dark:border-slate-800/80">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Lắng nghe & điền từ
              </span>
              <div className="flex items-center gap-1.5">
                {handleSeekTo && (
                  <button
                    type="button"
                    onClick={() => handleSeekTo(currentSub.startTime, currentSubIndex)}
                    className="px-2 py-0.5 rounded-md bg-white hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-[10.5px] flex items-center gap-1 transition-all cursor-pointer border border-slate-200/80 dark:border-slate-700/80 shadow-2xs"
                    title="Nghe lại video tại mốc thời gian này"
                  >
                    <Play className="w-2.5 h-2.5 text-[#0059bb] dark:text-sky-400 fill-current" />
                    <span>Video ({Math.floor(currentSub.startTime)}s)</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => playSlowAudio(currentSub.textEn)}
                  className="px-2 py-0.5 rounded-md bg-purple-50 hover:bg-purple-100 dark:bg-purple-950/40 dark:hover:bg-purple-900/40 text-purple-700 dark:text-purple-300 font-semibold text-[10.5px] flex items-center gap-1 transition-all cursor-pointer border border-purple-200/80 dark:border-purple-800/80"
                  title="Nghe AI đọc chậm câu này"
                >
                  <Volume2 className="w-2.5 h-2.5 text-purple-600 dark:text-purple-400" />
                  <span>AI Chậm</span>
                </button>
              </div>
            </div>

            <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display leading-relaxed text-center py-1">
              &ldquo;
              {renderMaskedSentence({
                textEn: currentSub.textEn,
                dictationWord: currentSub.dictationWord,
                dictationInput,
                dictationAnswered,
                dictationCorrect,
              })}
              &rdquo;
            </p>

            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium italic text-center border-t border-slate-200/60 dark:border-slate-800/80 pt-1.5">
              Dịch: {currentSub.textVn}
            </p>
          </div>

          {/* Input Box with External Label (Rule 6, Rule 15) */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="dictation-input-field"
                className="text-[10.5px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-sans"
              >
                Điền từ còn thiếu:
              </label>
              <button
                type="button"
                onClick={() => setShowHint(!showHint)}
                className="text-[10.5px] font-bold text-amber-600 dark:text-amber-400 hover:text-amber-700 flex items-center gap-1 cursor-pointer"
              >
                <HelpCircle className="w-3 h-3" />
                <span>{showHint ? "Ẩn gợi ý" : "Xem gợi ý"}</span>
              </button>
            </div>

            <input
              id="dictation-input-field"
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
              placeholder="Gõ từ bạn nghe được (Enter để kiểm tra)..."
              className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-bold text-center text-slate-900 dark:text-white focus:border-[#0059bb] focus:ring-2 focus:ring-[#0059bb]/20 focus:outline-hidden transition-all shadow-2xs"
            />

            {/* Hint Box */}
            {showHint && currentSub && (
              <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 text-xs font-mono font-bold text-center flex items-center justify-center gap-1.5 border border-amber-200 dark:border-amber-800/80 animate-in fade-in slide-in-from-top-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>
                  Gợi ý: Bắt đầu bằng &quot;
                  <span className="text-amber-950 dark:text-amber-100 font-extrabold underline">
                    {currentSub.dictationWord.charAt(0).toUpperCase()}
                  </span>
                  &quot; • {currentSub.dictationWord.length} chữ cái
                </span>
              </div>
            )}

            {/* Result Feedback Banner */}
            {dictationAnswered && (
              <div
                className={`p-2 rounded-xl text-xs font-bold text-center flex items-center justify-center gap-1.5 ${
                  dictationCorrect
                    ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800"
                    : "bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-800"
                }`}
              >
                {dictationCorrect ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Xuất sắc! Bạn nghe rất chuẩn (+20 XP)</span>
                  </>
                ) : (
                  <>
                    <X className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                    <span>Chưa đúng. Đáp án: &quot;{currentSub.dictationWord}&quot;</span>
                  </>
                )}
              </div>
            )}

            {/* Dynamic Single Primary CTA (Rule 18, Rule 19) */}
            {!dictationAnswered ? (
              <button
                type="button"
                onClick={handleCheckDictation}
                disabled={!dictationInput.trim()}
                className={`w-full py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer font-sans active:scale-[0.98] ${
                  dictationInput.trim()
                    ? "bg-[#0059bb] hover:bg-[#004899] text-white shadow-md shadow-[#0059bb]/25 ring-2 ring-[#0059bb]/20"
                    : "bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed"
                }`}
              >
                {dictationInput.trim() ? "Kiểm Tra Đáp Án (+20 XP)" : "Nhập từ để kiểm tra"}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNextDictation}
                className="w-full py-2.5 rounded-xl bg-[#0059bb] hover:bg-[#004899] text-white text-xs sm:text-sm font-bold transition-all shadow-md shadow-[#0059bb]/25 cursor-pointer font-sans active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <span>Câu Tiếp Theo</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* 4. MODE 2: SHADOWING LUYỆN NÓI AI */}
      {studyMode === "shadowing" && (
        <div className="space-y-2.5">
          {/* Sentence Card to Repeat */}
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 space-y-1.5 shadow-2xs">
            <div className="flex items-center justify-between pb-1 border-b border-slate-200/60 dark:border-slate-800/80">
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-500 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50 py-0.5 px-2 rounded-md">
                Câu mẫu nhại giọng
              </span>
              <div className="flex items-center gap-1.5">
                {handleSeekTo && (
                  <button
                    type="button"
                    onClick={() => handleSeekTo(currentSub.startTime, currentSubIndex)}
                    className="px-2 py-0.5 rounded-md bg-white hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-[10.5px] flex items-center gap-1 transition-all cursor-pointer border border-slate-200/80 dark:border-slate-700/80 shadow-2xs"
                    title="Nghe lại video tại mốc thời gian này"
                  >
                    <Play className="w-2.5 h-2.5 text-[#0059bb] dark:text-sky-400 fill-current" />
                    <span>Video ({Math.floor(currentSub.startTime)}s)</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => playSlowAudio(currentSub.textEn)}
                  className="px-2 py-0.5 rounded-md bg-purple-50 hover:bg-purple-100 dark:bg-purple-950/40 dark:hover:bg-purple-900/40 text-purple-700 dark:text-purple-300 font-semibold text-[10.5px] flex items-center gap-1 transition-all cursor-pointer border border-purple-200/80 dark:border-purple-800/80"
                  title="Nghe AI đọc chậm câu này"
                >
                  <Volume2 className="w-2.5 h-2.5 text-purple-600 dark:text-purple-400" />
                  <span>AI Chậm</span>
                </button>
              </div>
            </div>

            <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display leading-relaxed text-center py-1">
              &ldquo;{currentSub.textEn}&rdquo;
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium italic text-center border-t border-slate-200/60 dark:border-slate-800/80 pt-1">
              Dịch: {currentSub.textVn}
            </p>
          </div>

          {/* Equalizer & Voice Visualizer Card */}
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-center space-y-2.5 shadow-2xs">
            {/* Status Prompt */}
            <div className="text-[11px]">
              {isRecording ? (
                <span className="inline-flex items-center gap-1.5 font-bold text-rose-600 dark:text-rose-400 animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                  Đang lắng nghe... Hãy đọc to câu trên theo video!
                </span>
              ) : shadowingScore !== null ? (
                <span className="font-semibold text-slate-600 dark:text-slate-400">
                  Kết quả phân tích giọng đọc AI
                </span>
              ) : (
                <span className="text-slate-500 dark:text-slate-400 font-medium">
                  Nhấn Micro và đọc to câu mẫu để AI chấm điểm
                </span>
              )}
            </div>

            {/* Dynamic Sound Wave Visualizer */}
            <div className="flex items-center justify-center gap-1.5 h-8 px-4">
              {waveformBars.map((h, i) => (
                <div
                  key={i}
                  className={`w-1.5 rounded-full transition-all duration-150 ${
                    isRecording
                      ? "bg-gradient-to-t from-rose-500 to-amber-400"
                      : "bg-slate-200 dark:bg-slate-800"
                  }`}
                  style={{ height: `${isRecording ? Math.max(20, h) : 25}%` }}
                />
              ))}
            </div>

            {/* Big Ergonomic Microphone CTA Button */}
            <div className="flex flex-col items-center justify-center gap-1.5">
              <button
                type="button"
                onClick={toggleShadowingRecord}
                className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white cursor-pointer transition-all shadow-md active:scale-95 ${
                  isRecording
                    ? "bg-rose-600 animate-pulse shadow-rose-500/40 ring-4 ring-rose-400/30"
                    : "bg-[#0059bb] hover:bg-[#004899] shadow-[#0059bb]/25 hover:shadow-lg"
                }`}
                title={isRecording ? "Dừng ghi âm và chấm điểm" : "Bắt đầu đọc nhại theo video"}
              >
                {isRecording ? <Square className="w-5 h-5 fill-current" /> : <Mic className="w-5 h-5" />}
              </button>
              <span className="text-[10.5px] font-bold text-slate-500 dark:text-slate-400">
                {isRecording ? "Bấm để dừng và chấm điểm" : "Bấm Micro để bắt đầu đọc"}
              </span>
            </div>

            {/* AI Pronunciation Score Card */}
            {shadowingScore !== null && (
              <div className="space-y-2 pt-2 border-t border-slate-200/80 dark:border-slate-800 animate-in fade-in slide-in-from-top-1">
                <div
                  className={`p-2.5 rounded-xl text-xs font-bold text-center flex items-center justify-center gap-1.5 ${
                    shadowingScore >= 80
                      ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800"
                      : shadowingScore >= 60
                      ? "bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800"
                      : "bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700"
                  }`}
                >
                  <Award className="w-4 h-4 shrink-0" />
                  <span>
                    {shadowingScore >= 80
                      ? `Điểm AI: ${shadowingScore}/100 - Xuất sắc! Phát âm rất chuẩn (+15 XP)`
                      : shadowingScore >= 60
                      ? `Điểm AI: ${shadowingScore}/100 - Khá tốt! Cần chú ý thêm trọng âm (+10 XP)`
                      : `Điểm AI: ${shadowingScore}/100 - Cần cố gắng! Hãy nghe lại mẫu nhé (+5 XP)`}
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={toggleShadowingRecord}
                    className="flex-1 py-1.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Luyện lại</span>
                  </button>
                  <button
                    type="button"
                    onClick={goToNextSub}
                    disabled={currentSubIndex >= totalSubs - 1}
                    className="flex-1 py-1.5 px-3 rounded-xl bg-[#0059bb] hover:bg-[#004899] text-white text-xs font-bold transition-all shadow-md shadow-[#0059bb]/20 cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-40"
                  >
                    <span>Câu tiếp</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
