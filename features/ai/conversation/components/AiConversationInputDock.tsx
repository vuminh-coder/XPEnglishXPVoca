"use client";

import React from "react";
import { Sparkles, Square, Mic, RotateCcw, Send, Volume2 } from "lucide-react";
import { SuggestedWord } from "../types";

interface AiConversationInputDockProps {
  inputText: string;
  setInputText: (text: string) => void;
  spokenText: string;
  isRecording: boolean;
  recordingTime: number;
  isSpeaking: boolean;
  isAiTyping: boolean;
  audioFrequencies: number[];
  currentSuggestions: {
    words: SuggestedWord[];
    phrases: string[];
  };
  onMicrophoneToggle: () => void;
  onResetSpeech: () => void;
  onSendMessage: (textToSend?: string) => void;
}

export function AiConversationInputDock({
  inputText,
  setInputText,
  spokenText,
  isRecording,
  recordingTime,
  isSpeaking,
  isAiTyping,
  audioFrequencies,
  currentSuggestions,
  onMicrophoneToggle,
  onResetSpeech,
  onSendMessage,
}: AiConversationInputDockProps) {
  const hasTextToSubmit = Boolean(inputText.trim() || spokenText.trim());

  return (
    <div className="space-y-1.5 shrink-0 select-none">
      {/* 1. Thanh Gợi Ý & Chỉ Báo Trạng Thái (Status & Suggestion Strip) */}
      <div className="pt-1.5 pb-0.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2 text-xs text-slate-700 dark:text-slate-300 flex-wrap shrink-0">
        {/* Left: Gợi ý nhanh */}
        <div className="flex items-center gap-1.5 flex-wrap min-w-0">
          {(currentSuggestions.words.length > 0 || currentSuggestions.phrases.length > 0) && (
            <>
              <span className="text-[11px] font-bold text-[#0059bb] dark:text-sky-400 uppercase tracking-wider flex items-center gap-1 shrink-0">
                <Sparkles className="w-3 h-3 text-[#0059bb] dark:text-sky-400" /> Gợi ý:
              </span>

              {currentSuggestions.words.slice(0, 3).map((w, idx) => (
                <React.Fragment key={`w_${idx}`}>
                  {idx > 0 && <span className="text-slate-300 dark:text-slate-700">•</span>}
                  <button
                    type="button"
                    onClick={() => onSendMessage(w.word)}
                    className="text-[11px] font-bold text-slate-700 dark:text-slate-200 hover:text-[#0059bb] dark:hover:text-sky-300 hover:underline cursor-pointer bg-transparent border-none p-0 focus:outline-none transition-colors"
                  >
                    {w.word}
                  </button>
                </React.Fragment>
              ))}

              {currentSuggestions.phrases.slice(0, 2).map((phrase, idx) => (
                <React.Fragment key={`p_${idx}`}>
                  <span className="text-slate-300 dark:text-slate-700 hidden xs:inline">•</span>
                  <button
                    type="button"
                    onClick={() => onSendMessage(phrase)}
                    className="text-[11px] text-slate-600 dark:text-slate-300 hover:text-[#0059bb] dark:hover:text-sky-300 font-semibold cursor-pointer bg-transparent border-none p-0 focus:outline-none transition-colors truncate max-w-[180px] sm:max-w-[220px] hidden xs:inline"
                  >
                    "{phrase}"
                  </button>
                </React.Fragment>
              ))}
            </>
          )}
        </div>

        {/* Right: Trạng thái tương tác thời gian thực (Rule 6 - External Status) */}
        <div className="shrink-0 ml-auto">
          {isRecording ? (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-rose-50 dark:bg-rose-950/50 border border-rose-200/80 dark:border-rose-900/40 text-rose-600 dark:text-rose-400 text-[11px] font-bold font-mono animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              Đang nghe (00:{recordingTime < 10 ? `0${recordingTime}` : recordingTime})
            </span>
          ) : isSpeaking ? (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/50 border border-blue-200/80 dark:border-blue-800/40 text-[#0059bb] dark:text-sky-300 text-[11px] font-bold">
              <Volume2 className="w-3 h-3 animate-pulse" />
              AI đang đọc...
            </span>
          ) : isAiTyping ? (
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
              AI đang suy nghĩ...
            </span>
          ) : hasTextToSubmit ? (
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 hidden sm:inline">
              Nhấn Enter để gửi
            </span>
          ) : (
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 hidden sm:inline">
              Bấm Micro để nói hoặc gõ phím
            </span>
          )}
        </div>
      </div>

      {/* 2. Khung Nhập Liệu & Nút Hành Động (Ergonomic Voice & Text Input Dock) */}
      <div className="p-1 sm:p-1.5 rounded-2xl bg-slate-50/90 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-1">
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Micro Button (Dynamic Primary/Secondary: Rule 18) */}
          <button
            type="button"
            onClick={onMicrophoneToggle}
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all shrink-0 cursor-pointer ${
              isRecording
                ? "bg-rose-500 hover:bg-rose-600 text-white animate-pulse ring-4 ring-rose-500/25 shadow-md"
                : hasTextToSubmit
                ? "bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700"
                : "bg-[#0059bb] hover:bg-[#004899] text-white shadow-xs hover:scale-105 active:scale-95 ring-2 ring-[#0059bb]/20"
            }`}
            title={
              isRecording
                ? "Đang thu âm • Bấm lại Micro để DỪNG VÀ GỬI ĐI"
                : "Nhấn nút Micro để nói tiếng Anh (Bấm lại để gửi)"
            }
          >
            {isRecording ? (
              <Square className="w-3.5 h-3.5 fill-white" />
            ) : (
              <Mic className="w-4 h-4 stroke-[2]" />
            )}
          </button>

          {/* Text Input Box */}
          <div className="relative flex-1 min-w-0">
            <input
              type="text"
              disabled={isAiTyping}
              value={isRecording ? spokenText : inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !isAiTyping) {
                  e.preventDefault();
                  onSendMessage();
                }
              }}
              placeholder={
                isAiTyping
                  ? "AI đang phản hồi..."
                  : isRecording
                  ? `Đang nhận diện giọng nói của bạn...`
                  : "Nhập câu trả lời bằng tiếng Anh hoặc bấm Micro..."
              }
              aria-label="Nội dung hội thoại tiếng Anh"
              className="w-full h-8.5 sm:h-9 pl-3 pr-8 text-xs sm:text-sm font-medium rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-[#0059bb] transition-colors"
            />
            {(inputText || spokenText) && (
              <button
                type="button"
                onClick={() => {
                  setInputText("");
                  onResetSpeech();
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-rose-500 transition-colors p-1 cursor-pointer"
                title="Xóa văn bản"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Send Button (Dynamic Primary/Secondary: Rule 18) */}
          <button
            type="button"
            onClick={() => onSendMessage()}
            disabled={!hasTextToSubmit || isAiTyping}
            className={`h-8.5 sm:h-9 px-3 sm:px-3.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 shrink-0 transition-all cursor-pointer ${
              hasTextToSubmit && !isAiTyping
                ? "bg-[#0059bb] hover:bg-[#004899] text-white shadow-xs active:scale-95"
                : "bg-slate-100 dark:bg-slate-800/60 text-slate-400 dark:text-slate-500 border border-slate-200/60 dark:border-slate-800 cursor-not-allowed opacity-50"
            }`}
            title="Gửi câu trả lời (Phím Enter)"
          >
            <Send className="w-3.5 h-3.5 stroke-[2]" />
            <span className="hidden sm:inline">Gửi</span>
          </button>
        </div>

        {/* Dynamic Voice Waveform: Gắn liền tinh tế vào dock */}
        {(isRecording || isSpeaking) && (
          <div className="flex items-center justify-center gap-[3px] h-3.5 bg-white/60 dark:bg-slate-900/60 px-2 py-0.5 rounded-lg border border-slate-200/50 dark:border-slate-800/80">
            {audioFrequencies.map((freq, i) => (
              <div
                key={i}
                className="w-[2px] sm:w-[2.5px] rounded-full shrink-0 transition-all duration-75"
                style={{
                  height: `${Math.max(3, Math.min(10, (freq / 100) * 10))}px`,
                  backgroundColor: isRecording ? "#f43f5e" : "#0059bb",
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
