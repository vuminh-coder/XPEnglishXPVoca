"use client";
import React from "react";
import {
  Target,
  Lightbulb,
  Sparkles,
  Mic,
  Award,
  Volume2,
  ArrowRight,
  CheckCircle2,
  XCircle,
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

export function maskDictationWord(textEn: string, dictationWord: string): string {
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

function renderMaskedSentence(
  textEn: string,
  dictationWord: string,
  dictationAnswered: boolean,
  dictationCorrect: boolean | null
) {
  if (!textEn) return null;
  if (!dictationWord) {
    return <span className="font-display font-medium text-slate-800 dark:text-slate-100">{textEn}</span>;
  }

  const escaped = dictationWord.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(\\b${escaped}\\b)`, "gi");
  let parts = textEn.split(regex);

  if (parts.length <= 1) {
    const subRegex = new RegExp(`(${escaped})`, "gi");
    parts = textEn.split(subRegex);
  }

  if (parts.length <= 1) {
    return <span className="font-display font-medium text-slate-800 dark:text-slate-100">{textEn}</span>;
  }

  return (
    <span className="font-display font-medium text-slate-800 dark:text-slate-100 leading-relaxed text-[13.5px] sm:text-[14px]">
      {parts.map((part, index) => {
        if (part.toLowerCase() === dictationWord.toLowerCase()) {
          if (!dictationAnswered) {
            return (
              <span
                key={index}
                className="inline-flex items-center px-2 py-0.5 mx-1 rounded-md bg-blue-50 dark:bg-blue-950/60 border border-[#0059bb]/30 dark:border-sky-500/30 text-[#0059bb] dark:text-sky-300 font-mono font-bold text-xs tracking-wider shadow-2xs select-none"
              >
                [ _____ ]
              </span>
            );
          }
          if (dictationCorrect) {
            return (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-2 py-0.5 mx-1 rounded-md bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300 font-mono font-bold text-xs shadow-2xs"
              >
                ✓ {part}
              </span>
            );
          }
          return (
            <span
              key={index}
              className="inline-flex items-center gap-1 px-2 py-0.5 mx-1 rounded-md bg-rose-50 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-700 text-rose-700 dark:text-rose-300 font-mono font-bold text-xs shadow-2xs underline decoration-rose-400"
            >
              ✗ {part}
            </span>
          );
        }
        return <span key={index}>{part}</span>;
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
  const currentSub = activeVideo?.subtitles?.[currentSubIndex];

  if (!currentSub) {
    return (
      <div className="p-6 text-center text-xs text-slate-500 dark:text-slate-400">
        Không có dữ liệu phụ đề cho bài tập này.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* 1. TOP META BAR: Question counter + Audio Replay + Sync Status */}
      <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md border border-slate-200/80 dark:border-slate-700">
            Câu {currentSubIndex + 1} / {activeVideo.subtitles.length}
          </span>
          {handleSeekTo && (
            <button
              type="button"
              onClick={() => handleSeekTo(currentSub.startTime, currentSubIndex)}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold text-[#0059bb] dark:text-sky-400 hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              title="Nghe lại câu này trong video"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Nghe lại</span>
            </button>
          )}
        </div>

        {currentSubIndex !== activeSubIndex && (
          <button
            type="button"
            onClick={() => {
              setCurrentSubIndex(activeSubIndex);
              setDictationInput("");
              setShowHint(false);
            }}
            className="text-[11px] font-bold text-[#0059bb] dark:text-sky-400 hover:underline flex items-center gap-1 cursor-pointer"
            title={`Nhảy tới câu video đang phát (#${activeSubIndex + 1})`}
          >
            <Target className="w-3 h-3 text-[#0059bb] dark:text-sky-400" />
            <span>Câu đang phát (#{activeSubIndex + 1})</span>
          </button>
        )}
      </div>

      {/* 2. QUESTION CARD: Left-aligned (Rule 16) with missing blank highlighted */}
      <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 space-y-2 text-left shadow-2xs">
        <div className="text-left font-display">
          “{renderMaskedSentence(
            currentSub.textEn || "",
            currentSub.dictationWord || "",
            dictationAnswered,
            dictationCorrect
          )}”
        </div>
        {currentSub.textVn && (
          <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800/80 flex items-start gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <span className="shrink-0 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 bg-slate-200/60 dark:bg-slate-800 px-1 py-0.2 rounded">
              Dịch
            </span>
            <span className="leading-relaxed font-sans">{currentSub.textVn}</span>
          </div>
        )}
      </div>

      {/* 3. ALL-IN-ONE INPUT ROW & FEEDBACK (Rules 6, 18, 19) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="dictation-input-field" className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Điền từ còn thiếu:
          </label>
          {showHint && currentSub.dictationWord && (
            <span className="text-[11px] font-mono font-medium text-amber-600 dark:text-amber-400 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-500" /> Ký tự đầu &quot;{currentSub.dictationWord.charAt(0).toUpperCase()}&quot; ({currentSub.dictationWord.length} chữ cái)
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 shadow-2xs focus-within:border-[#0059bb] focus-within:ring-2 focus-within:ring-[#0059bb]/15 transition-all">
          <input
            id="dictation-input-field"
            type="text"
            value={dictationInput}
            onChange={(e) => setDictationInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                e.stopPropagation();
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
            placeholder="Gõ từ còn thiếu vào đây (Enter)..."
            className="flex-1 px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-900 dark:text-white bg-transparent placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-hidden disabled:opacity-60"
          />

          {/* Hint button */}
          <button
            type="button"
            onClick={() => setShowHint(!showHint)}
            className={`p-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              showHint
                ? "bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-300 dark:border-amber-700"
                : "text-slate-400 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/30"
            }`}
            title={showHint ? "Ẩn gợi ý" : "Xem gợi ý ký tự đầu"}
            aria-label="Gợi ý"
          >
            <Lightbulb className="w-4 h-4" />
          </button>

          {/* Single Primary Action Button (Rule 18) */}
          {!dictationAnswered ? (
            <button
              type="button"
              onClick={handleCheckDictation}
              disabled={!dictationInput.trim()}
              className="px-3.5 py-2 rounded-lg bg-[#0059bb] hover:bg-[#004899] disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 shadow-2xs active:scale-95 cursor-pointer font-sans"
            >
              <span>Kiểm tra</span>
              <span className="text-[10px] font-mono opacity-85 px-1 py-0.2 rounded bg-white/20">+20XP</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNextDictation}
              className="px-3.5 py-2 rounded-lg bg-[#0059bb] hover:bg-[#004899] text-white text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 shadow-2xs active:scale-95 cursor-pointer font-sans"
            >
              <span>Câu tiếp theo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Result feedback banner when answered */}
        {dictationAnswered && (
          <div
            className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between border ${
              dictationCorrect
                ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800"
                : "bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-800"
            }`}
          >
            <div className="flex items-center gap-1.5">
              {dictationCorrect ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Chính xác! Bắt âm rất chuẩn.</span>
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
                  <span>
                    Chưa đúng. Đáp án:{" "}
                    <strong className="font-mono text-rose-900 dark:text-rose-200 underline underline-offset-2 ml-1">
                      {currentSub.dictationWord}
                    </strong>
                  </span>
                </>
              )}
            </div>
            {dictationCorrect && (
              <span className="font-mono text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                +20 XP
              </span>
            )}
          </div>
        )}
      </div>

      {/* 4. COMPACT HORIZONTAL SHADOWING AI BAR (Rules 18, 20) */}
      <div className="pt-3 border-t border-slate-200/70 dark:border-slate-800 space-y-2">
        <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1.5 uppercase tracking-wider">
            <Mic className="w-3.5 h-3.5 text-rose-500" /> Luyện nhại giọng (Shadowing AI)
          </span>
          {shadowingScore !== null && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 font-mono text-[11px] font-bold border border-emerald-200 dark:border-emerald-800">
              <Award className="w-3 h-3 text-emerald-600" /> {shadowingScore}/100 (+15 XP)
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800">
          {/* Secondary / State-driven Mic button (Rule 18) */}
          <button
            type="button"
            onClick={toggleShadowingRecord}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shrink-0 border ${
              isRecording
                ? "bg-rose-600 text-white border-rose-600 animate-pulse shadow-xs shadow-rose-500/30"
                : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-700 hover:text-rose-600 hover:border-rose-300 hover:bg-rose-50/50 dark:hover:bg-rose-950/20"
            }`}
            title={isRecording ? "Dừng ghi âm và chấm điểm" : "Bắt đầu đọc nhại theo video"}
          >
            <Mic className={`w-3.5 h-3.5 ${isRecording ? "text-white" : "text-rose-500"}`} />
            <span>{isRecording ? "Dừng ghi" : "Ghi âm nhại"}</span>
          </button>

          {/* Horizontal Waveform Visualizer */}
          <div className="flex-1 flex items-center justify-center gap-1 h-7 px-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200/60 dark:border-slate-800">
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
        </div>
      </div>
    </div>
  );
}
