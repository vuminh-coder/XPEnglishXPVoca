"use client";
import React from "react";
import { Target, HelpCircle, Sparkles, Mic, Award } from "lucide-react";
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
}: DictationTabPaneProps) {
  const currentSub = activeVideo.subtitles[currentSubIndex];

  return (
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
            currentSub?.textEn || "",
            currentSub?.dictationWord || ""
          )}”
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
          Dịch: {currentSub?.textVn}
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

        {showHint && currentSub && (
          <div className="p-2.5 rounded-xl bg-amber-50/90 text-amber-800 text-xs font-mono font-bold text-center flex items-center justify-center gap-1.5 border border-amber-200">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0" /> Gợi ý: Bắt đầu bằng chữ cái &quot;
            {currentSub.dictationWord.charAt(0).toUpperCase()}&quot; (Độ dài:{" "}
            {currentSub.dictationWord.length} ký tự)
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
                : `✗ Chưa đúng. Đáp án: "${currentSub?.dictationWord}"`}
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
  );
}
