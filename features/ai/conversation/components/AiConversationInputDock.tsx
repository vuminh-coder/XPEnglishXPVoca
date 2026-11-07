"use client";

import React from "react";
import { Sparkles, Square, Mic, RotateCcw, Send } from "lucide-react";
import { SuggestedWord } from "../types";

interface AiConversationInputDockProps {
  inputText: string;
  setInputText: (text: string) => void;
  spokenText: string;
  isRecording: boolean;
  recordingTime: number;
  isSpeaking: boolean;
  isAiTyping: boolean;
  currentSuggestions: {
    words: SuggestedWord[];
    phrases: string[];
  };
  onMicrophoneToggle: () => void;
  onResetSpeech: () => void;
  onSendMessage: (textToSend?: string) => void;
  onInsertWord?: (word: string) => void;
}

export function AiConversationInputDock({
  inputText,
  setInputText,
  spokenText,
  isRecording,
  isAiTyping,
  currentSuggestions,
  onMicrophoneToggle,
  onResetSpeech,
  onSendMessage,
  onInsertWord,
}: AiConversationInputDockProps) {
  const hasTextToSubmit = Boolean(inputText.trim() || spokenText.trim());

  return (
    <div className="space-y-1.5 shrink-0 select-none">
      {/* 1. Thanh Gợi Ý Mobile (< lg): Hiển thị gọn gàng không tràn ngang, Desktop đã có ở cột phải */}
      {(currentSuggestions.words.length > 0 || currentSuggestions.phrases.length > 0) && (
        <div className="lg:hidden pt-1.5 pb-0.5 border-t border-slate-100 dark:border-slate-800 shrink-0 min-w-0 space-y-1.5">
          {currentSuggestions.words.length > 0 && (
            <div className="flex items-center gap-1.5 flex-wrap min-w-0">
              <span className="text-xs font-bold text-[#0059bb] dark:text-sky-400 uppercase tracking-wider flex items-center gap-1 shrink-0 select-none">
                <Sparkles className="w-3.5 h-3.5 text-[#0059bb]" /> Từ gợi ý:
              </span>
              {currentSuggestions.words.slice(0, 3).map((w, idx) => (
                <button
                  key={`mob_w_${idx}`}
                  type="button"
                  onClick={() => (onInsertWord ? onInsertWord(w.word) : onSendMessage(w.word))}
                  className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/60 text-xs font-bold text-slate-800 dark:text-slate-200 hover:text-[#0059bb] dark:hover:text-sky-300 border border-slate-200/80 dark:border-slate-700 cursor-pointer transition-colors shrink-0"
                >
                  {w.word}
                </button>
              ))}
            </div>
          )}

          {currentSuggestions.phrases.length > 0 && (
            <button
              type="button"
              onClick={() => onSendMessage(currentSuggestions.phrases[0])}
              className="w-full text-left px-2.5 py-1.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/25 border border-amber-200/70 dark:border-amber-900/40 text-xs font-semibold text-amber-950 dark:text-amber-100 hover:border-amber-400 transition-colors cursor-pointer leading-snug"
            >
              "{currentSuggestions.phrases[0]}"
            </button>
          )}
        </div>
      )}

      {/* 2. Khung Nhập Liệu & Nút Hành Động (Ergonomic Voice & Text Input Dock — 0px CLS) */}
      <div className="p-1.5 rounded-xl bg-slate-50/90 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 shadow-2xs">
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Micro Button (Dynamic Primary/Secondary: Rule 18) */}
          <button
            type="button"
            onClick={onMicrophoneToggle}
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all shrink-0 cursor-pointer ${
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
                  ? "Đang nghe giọng nói..."
                  : "Nhập tiếng Anh hoặc nói..."
              }
              aria-label="Nội dung hội thoại tiếng Anh"
              className="w-full h-9 sm:h-10 pl-3 pr-8 text-xs sm:text-sm font-medium rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-[#0059bb] transition-colors"
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

          {/* Send Button (Dynamic Primary/Secondary: Rule 18 & Rule 19 clear action verb) */}
          <button
            type="button"
            onClick={() => onSendMessage()}
            disabled={!hasTextToSubmit || isAiTyping}
            className={`h-9 sm:h-10 px-3 sm:px-3.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 shrink-0 transition-all cursor-pointer ${
              hasTextToSubmit && !isAiTyping
                ? "bg-[#0059bb] hover:bg-[#004899] text-white shadow-xs active:scale-95"
                : "bg-slate-100 dark:bg-slate-800/60 text-slate-400 dark:text-slate-500 border border-slate-200/60 dark:border-slate-800 cursor-not-allowed opacity-60"
            }`}
            title="Gửi câu trả lời (Phím Enter)"
          >
            <Send className="w-3.5 h-3.5 stroke-[2]" />
            <span>Gửi</span>
          </button>
        </div>
      </div>
    </div>
  );
}
