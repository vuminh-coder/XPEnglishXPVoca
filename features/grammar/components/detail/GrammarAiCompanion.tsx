"use client";

import React from "react";
import { MessageSquare, Sparkles, Loader2, Send, HelpCircle, Lightbulb, FileText, Search } from "lucide-react";
import { GrammarChatMessage } from "../../types/grammarTypes";

interface GrammarAiCompanionProps {
  topicName: string;
  chatMessages: GrammarChatMessage[];
  chatInput: string;
  setChatInput: (val: string) => void;
  chatLoading: boolean;
  onSendMessage: (text: string) => void;
  prompts: string[];
}

export function GrammarAiCompanion({
  topicName,
  chatMessages,
  chatInput,
  setChatInput,
  chatLoading,
  onSendMessage,
  prompts,
}: GrammarAiCompanionProps) {
  const renderFormattedText = (content: string) => {
    if (!content) return null;
    const lines = content.split("\n");
    return (
      <div className="space-y-1.5 font-medium leading-relaxed">
        {lines.map((line, lIdx) => {
          let trimmed = line.trim();
          if (!trimmed) return null;

          if (trimmed.startsWith("* ")) {
            trimmed = "• " + trimmed.substring(2);
          }

          const parts = trimmed.split(/(\*\*.*?\*\*)/g);

          return (
            <p key={lIdx} className="whitespace-pre-line">
              {parts.map((part, pIdx) => {
                if (part.startsWith("**") && part.endsWith("**")) {
                  return (
                    <strong
                      key={pIdx}
                      className="font-bold text-[#0059bb] dark:text-sky-400"
                    >
                      {part.slice(2, -2)}
                    </strong>
                  );
                }
                return <span key={pIdx}>{part}</span>;
              })}
            </p>
          );
        })}
      </div>
    );
  };

  const getPromptIcon = (idx: number) => {
    switch (idx % 4) {
      case 0:
        return <HelpCircle className="w-3.5 h-3.5 text-blue-500 shrink-0" />;
      case 1:
        return <Lightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0" />;
      case 2:
        return <FileText className="w-3.5 h-3.5 text-emerald-500 shrink-0" />;
      default:
        return <Search className="w-3.5 h-3.5 text-purple-500 shrink-0" />;
    }
  };

  return (
    <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-4 sticky top-4">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="w-10 h-10 rounded-xl bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 border border-purple-500/20 flex items-center justify-center shrink-0 shadow-2xs">
          <MessageSquare className="w-4 h-4" />
        </div>
        <div className="min-w-0">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white font-display truncate">
            Trợ Lý AI Tutor
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium truncate">
            {topicName}
          </p>
        </div>
      </div>

      {/* Chat Message Stream */}
      <div className="space-y-3 max-h-80 lg:max-h-[380px] overflow-y-auto pr-1 no-scrollbar min-h-[140px]">
        {chatMessages.length === 0 ? (
          <div className="p-4 text-center rounded-2xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-200/60 dark:border-purple-800/40 text-xs text-purple-900 dark:text-purple-300 font-medium space-y-1.5 shadow-2xs">
            <div className="font-bold flex items-center justify-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400 shrink-0" />
              <span>Bạn có thắc mắc về câu hỏi hay cấu trúc này không?</span>
            </div>
            <div className="text-[11px] opacity-80">
              Bấm gợi ý 1-Click hoặc gõ câu hỏi để trao đổi trực tiếp với AI Tutor!
            </div>
          </div>
        ) : (
          chatMessages.map((msg, mIdx) => (
            <div
              key={mIdx}
              className={`flex items-start gap-2 ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.role === "ai" && (
                <div className="w-7 h-7 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 text-xs border border-purple-500/20">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
              )}

              <div
                className={`p-3 rounded-2xl text-xs leading-relaxed max-w-[90%] shadow-2xs ${
                  msg.role === "user"
                    ? "bg-[#0059bb] text-white font-semibold"
                    : "bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 text-slate-900 dark:text-white font-medium"
                }`}
              >
                {msg.role === "user" ? msg.text : renderFormattedText(msg.text)}
              </div>
            </div>
          ))
        )}

        {chatLoading && (
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#0059bb] dark:text-sky-400 p-1">
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            <span>AI Tutor đang phân tích...</span>
          </div>
        )}
      </div>

      {/* Quick 1-Click Prompt Chips */}
      {chatMessages.length === 0 && (
        <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
          <div className="text-[10px] uppercase font-bold text-slate-400">
            Gợi ý câu hỏi 1-Click:
          </div>
          <div className="flex flex-col gap-1.5">
            {prompts.map((p, pIdx) => (
              <button
                key={pIdx}
                type="button"
                onClick={() => onSendMessage(p)}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-[#0059bb] hover:text-white text-slate-700 dark:text-slate-300 border border-slate-200/70 dark:border-slate-700/60 text-xs font-bold transition-all cursor-pointer text-left flex items-center gap-2 truncate active:scale-95"
              >
                {getPromptIcon(pIdx)}
                <span className="truncate">{p}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Chat Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSendMessage(chatInput);
        }}
        className="space-y-2 pt-1"
      >
        <textarea
          rows={2}
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              onSendMessage(chatInput);
            }
          }}
          placeholder="Hỏi AI Tutor... (Enter để gửi)"
          className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/90 dark:border-slate-800 text-xs font-medium text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all resize-none"
        />

        <button
          type="submit"
          disabled={!chatInput.trim() || chatLoading}
          className={`w-full h-10 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 font-display ${
            !chatInput.trim() || chatLoading
              ? "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border border-slate-200/80 dark:border-slate-700/60 cursor-not-allowed"
              : "bg-[#0059bb] hover:bg-[#004899] text-white shadow-md shadow-[#0059bb]/25 cursor-pointer active:scale-95"
          }`}
        >
          {chatLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              <Send className="w-3.5 h-3.5" />
              <span>Gửi Câu Hỏi</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
