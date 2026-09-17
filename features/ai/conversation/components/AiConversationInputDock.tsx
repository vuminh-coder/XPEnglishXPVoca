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
  return (
    <div className="space-y-1.5 shrink-0">
      {/* Dải Gợi Ý Thuần Chữ (Shrink-0) */}
      {(currentSuggestions.words.length > 0 || currentSuggestions.phrases.length > 0) && (
        <div className="pt-2 pb-0.5 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 flex-wrap shrink-0">
          <span className="text-xs font-bold text-[#0059bb] dark:text-sky-400 uppercase tracking-wider flex items-center gap-1 shrink-0 select-none">
            <Sparkles className="w-3.5 h-3.5 text-[#0059bb]" /> Gợi ý:
          </span>

          {currentSuggestions.words.slice(0, 3).map((w, idx) => (
            <React.Fragment key={`w_${idx}`}>
              {idx > 0 && <span className="text-slate-300 dark:text-slate-600 select-none">•</span>}
              <button
                type="button"
                onClick={() => onSendMessage(w.word)}
                className="text-xs font-bold text-slate-800 dark:text-slate-200 hover:text-[#0059bb] dark:hover:text-sky-400 cursor-pointer bg-transparent border-none p-0 focus:outline-none transition-colors"
              >
                {w.word}
              </button>
            </React.Fragment>
          ))}

          {currentSuggestions.phrases.slice(0, 2).map((phrase, idx) => (
            <React.Fragment key={`p_${idx}`}>
              <span className="text-slate-300 dark:text-slate-600 select-none">•</span>
              <button
                type="button"
                onClick={() => onSendMessage(phrase)}
                className="text-xs text-slate-700 dark:text-slate-300 hover:text-[#0059bb] dark:hover:text-sky-400 font-semibold cursor-pointer bg-transparent border-none p-0 focus:outline-none transition-colors truncate max-w-[220px]"
              >
                "{phrase}"
              </button>
            </React.Fragment>
          ))}
        </div>
      )}

      {/* Voice & Text Input Dock (Pinned to bottom of left card) */}
      <div className="pt-1.5 border-t border-slate-100 dark:border-slate-800 space-y-1.5 shrink-0">
        <div className="flex items-center gap-2 p-1.5 sm:p-2 rounded-2xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800">
          {/* Micro Toggle-to-Send Button */}
          <button
            type="button"
            onClick={onMicrophoneToggle}
            className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all shrink-0 cursor-pointer ${
              isRecording
                ? "bg-rose-500 text-white animate-pulse ring-4 ring-rose-500/25"
                : "bg-[#0059bb] hover:bg-[#004899] text-white hover:scale-105 active:scale-95"
            }`}
            title={
              isRecording
                ? "Đang thu âm • Bấm lại Micro để DỪNG VÀ GỬI ĐI"
                : "Nhấn nút Micro để nói tiếng Anh (Bấm lại để gửi)"
            }
          >
            {isRecording ? (
              <Square className="w-4 h-4 fill-white" />
            ) : (
              <Mic className="w-4.5 h-4.5 stroke-[2]" />
            )}
          </button>

          {/* Text Input Box */}
          <div className="relative flex-1">
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
                  ? `🔴 Đang nghe bạn nói... (00:${
                      recordingTime < 10 ? `0${recordingTime}` : recordingTime
                    }) • Bấm lại Micro để GỬI`
                  : "Nhập câu trả lời bằng tiếng Anh hoặc bấm Micro để nói..."
              }
              aria-label="Nội dung hội thoại tiếng Anh"
              className="w-full h-9 pl-3 pr-8 text-xs sm:text-sm font-medium rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-[#0059bb]"
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

          {/* Send Button */}
          <button
            type="button"
            onClick={() => onSendMessage()}
            disabled={(!inputText.trim() && !spokenText.trim()) || isAiTyping}
            className="h-9 px-3.5 rounded-xl bg-[#0059bb] hover:bg-[#004899] disabled:opacity-40 text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-2xs cursor-pointer shrink-0 transition-all active:scale-95"
            title="Gửi tin nhắn (Phím Enter)"
          >
            <Send className="w-3.5 h-3.5 stroke-[2]" />
            <span className="hidden sm:inline">Gửi</span>
          </button>
        </div>

        {/* Active Audio Waveform */}
        {(isRecording || isSpeaking) && (
          <div className="flex items-center justify-center gap-[3px] h-4 bg-slate-50 dark:bg-slate-950/60 px-2 py-0.5 rounded-xl border border-slate-200/60 dark:border-slate-800">
            {audioFrequencies.map((freq, i) => (
              <div
                key={i}
                className="w-[2.5px] rounded-full shrink-0 transition-all duration-75"
                style={{
                  height: `${Math.max(3, Math.min(12, (freq / 100) * 12))}px`,
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
