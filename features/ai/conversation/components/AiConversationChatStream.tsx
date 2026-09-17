"use client";

import React, { RefObject } from "react";
import { Bot, Volume2, VolumeX, Sparkles, RefreshCw } from "lucide-react";
import { UserAvatar } from "@/shared/components/feedback/UserAvatar";
import { Message, Topic } from "../types";

interface AiConversationChatStreamProps {
  messages: Message[];
  currentTopic: Topic;
  isAiTyping: boolean;
  soundEnabled: boolean;
  onToggleSound: () => void;
  showTranslations: Record<string, boolean>;
  onToggleTranslation: (msgId: string) => void;
  onWordClick: (word: string) => void;
  onSpeakText: (text: string) => void;
  user: any;
  chatBottomRef: RefObject<HTMLDivElement | null>;
}

export function AiConversationChatStream({
  messages,
  currentTopic,
  isAiTyping,
  soundEnabled,
  onToggleSound,
  showTranslations,
  onToggleTranslation,
  onWordClick,
  onSpeakText,
  user,
  chatBottomRef,
}: AiConversationChatStreamProps) {
  return (
    <div className="flex flex-col flex-1 min-h-0 min-w-0 space-y-2.5">
      {/* Header Trong Khung Chat */}
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2 gap-2 shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <span className="px-2 py-0.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-300 font-bold text-xs font-mono border border-blue-200/60 dark:border-blue-800/40">
            AI Tutor
          </span>
          <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display truncate">
            {currentTopic.name} ({currentTopic.nameEn})
          </span>
        </div>

        {/* Sound Button */}
        <button
          type="button"
          onClick={onToggleSound}
          className={`px-2.5 py-1 rounded-xl text-xs font-bold border transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer ${
            soundEnabled
              ? "bg-slate-50 dark:bg-slate-800/80 border-slate-200/80 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-[#0059bb]"
              : "bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900/30 text-rose-600 dark:text-rose-400"
          }`}
          title={soundEnabled ? "Tắt âm thanh" : "Bật âm thanh"}
        >
          {soundEnabled ? (
            <Volume2 className="w-3.5 h-3.5 text-[#0059bb]" />
          ) : (
            <VolumeX className="w-3.5 h-3.5" />
          )}
          <span className="hidden sm:inline">{soundEnabled ? "Bật âm" : "Tắt âm"}</span>
        </button>
      </div>

      {/* Scrollable Chat Stream Box */}
      <div className="flex-1 min-h-[280px] lg:min-h-0 overflow-y-auto space-y-3 p-1 pr-1.5 scrollbar-thin">
        {messages.map((msg) => {
          const isAi = msg.role === "ai";
          const isTranslated = showTranslations[msg.id];

          return (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 ${isAi ? "justify-start" : "justify-end"}`}
            >
              {isAi && (
                <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-400 flex items-center justify-center shrink-0 mt-0.5 border border-blue-200/80 dark:border-blue-800/50 shadow-2xs text-xs font-mono font-bold">
                  <Bot className="w-4 h-4 stroke-[2]" />
                </div>
              )}

              <div
                className={`space-y-1.5 max-w-[88%] sm:max-w-[82%] ${
                  isAi ? "" : "items-end flex flex-col"
                }`}
              >
                {/* Chat Bubble */}
                <div
                  className={`p-3 rounded-2xl text-xs sm:text-sm font-medium leading-relaxed shadow-2xs transition-all ${
                    isAi
                      ? "bg-slate-50/90 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800 text-slate-900 dark:text-white"
                      : "bg-gradient-to-r from-[#0059bb] to-blue-600 text-white shadow-sm"
                  }`}
                >
                  {/* Word-by-word 1-Click Interactive Text Rendering for AI */}
                  {isAi ? (
                    <div className="flex flex-wrap gap-1 leading-relaxed">
                      {msg.text.split(" ").map((w, idx) => (
                        <span
                          key={idx}
                          onClick={() => onWordClick(w)}
                          className="cursor-pointer hover:bg-blue-100 dark:hover:bg-sky-400/20 hover:text-[#0059bb] dark:hover:text-sky-300 rounded px-0.5 py-0.2 transition-colors font-medium text-xs sm:text-sm"
                        >
                          {w}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs sm:text-sm">{msg.text}</p>
                  )}

                  {/* Vietnamese Translation Display */}
                  {isTranslated && msg.vietnameseTranslation && (
                    <div className="mt-2 pt-2 border-t border-slate-200/60 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 flex items-start gap-1.5">
                      <span className="shrink-0 text-[#0059bb] dark:text-sky-400 font-bold font-mono">
                        [Dịch]
                      </span>
                      <span>{msg.vietnameseTranslation}</span>
                    </div>
                  )}
                </div>

                {/* AI Grammar Correction Card */}
                {!isAi && (msg.grammarCorrection?.hasError || msg.betterPhrasing) && (
                  <div className="p-3 rounded-2xl bg-slate-100/90 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 text-xs space-y-2 text-left w-full shadow-2xs">
                    {msg.grammarCorrection?.hasError && (
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-100">
                          <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                          <span>Sửa ngữ pháp:</span>
                        </div>
                        <div className="flex items-center flex-wrap gap-1.5 text-xs font-semibold">
                          <span className="line-through text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 px-2 py-0.5 rounded-lg border border-rose-200/60 dark:border-rose-900/30">
                            {msg.grammarCorrection.original}
                          </span>
                          <span className="text-slate-400 dark:text-slate-500 font-bold">➔</span>
                          <span className="font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-lg border border-emerald-200/60 dark:border-emerald-900/30">
                            {msg.grammarCorrection.corrected}
                          </span>
                        </div>
                        {msg.grammarCorrection.explanation && (
                          <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300 pt-0.5">
                            {msg.grammarCorrection.explanation.replace(/^\((.*)\)$/, "$1").trim()}
                          </p>
                        )}
                      </div>
                    )}

                    {msg.betterPhrasing && (
                      <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700 space-y-1">
                        <div className="flex items-center gap-1 text-xs font-bold text-[#0059bb] dark:text-sky-400">
                          <Sparkles className="w-3.5 h-3.5 text-[#0059bb]" />
                          <span>Diễn đạt tự nhiên hơn:</span>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-xs font-bold text-slate-900 dark:text-slate-100">
                            "
                            {msg.betterPhrasing
                              .replace(/^["']|["']$/g, "")
                              .replace(
                                /^(A more natural way to say that (would be|is)|You could say|A better phrasing is|Try saying),?\s*/i,
                                ""
                              )
                              .replace(/^["']|["']$/g, "")}
                            "
                          </p>
                          <button
                            type="button"
                            onClick={() =>
                              onSpeakText(
                                msg.betterPhrasing
                                  ?.replace(/^["']|["']$/g, "")
                                  .replace(
                                    /^(A more natural way to say that (would be|is)|You could say|A better phrasing is|Try saying),?\s*/i,
                                    ""
                                  )
                                  .replace(/^["']|["']$/g, "") || ""
                              )
                            }
                            className="p-1 rounded-lg text-slate-400 hover:text-[#0059bb] dark:hover:text-sky-400 transition-colors shrink-0 cursor-pointer"
                            title="Nghe phát âm câu tự nhiên"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* AI Action Strip */}
                {isAi && (
                  <div className="flex items-center gap-3 px-1">
                    <button
                      type="button"
                      onClick={() => onSpeakText(msg.text)}
                      className="text-xs font-bold text-slate-600 hover:text-[#0059bb] dark:text-slate-300 dark:hover:text-sky-400 flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <Volume2 className="w-3.5 h-3.5 text-[#0059bb]" /> Nghe lại
                    </button>
                    {msg.vietnameseTranslation && (
                      <button
                        type="button"
                        onClick={() => onToggleTranslation(msg.id)}
                        className="text-xs font-bold text-slate-600 hover:text-[#0059bb] dark:text-slate-300 dark:hover:text-sky-400 cursor-pointer"
                      >
                        {isTranslated ? "Ẩn dịch" : "Xem bản dịch"}
                      </button>
                    )}
                  </div>
                )}
              </div>

              {!isAi && (
                <UserAvatar
                  avatar={(user as any)?.avatar}
                  avatarUrl={(user as any)?.avatarUrl}
                  imageUrl={user?.imageUrl}
                  emoji={user?.avatarEmoji}
                  name={user?.fullName || user?.username || user?.email}
                  size="w-8 h-8"
                  className="mt-0.5 shrink-0"
                />
              )}
            </div>
          );
        })}

        {isAiTyping && (
          <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-800/40 text-[#0059bb] dark:text-sky-300 text-xs font-bold animate-pulse w-fit shadow-2xs">
            <RefreshCw className="w-4 h-4 animate-spin" /> AI đang suy nghĩ câu trả lời...
          </div>
        )}
        <div ref={chatBottomRef} />
      </div>
    </div>
  );
}
