"use client";

import React, { RefObject, useMemo, useState, useEffect } from "react";
import {
  Bot,
  Volume2,
  VolumeX,
  Sparkles,
  RefreshCw,
  Languages,
  Copy,
  Check,
} from "lucide-react";
import { motion } from "framer-motion";
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
  isSpeaking?: boolean;
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
  isSpeaking = false,
  user,
  chatBottomRef,
}: AiConversationChatStreamProps) {
  const [speakingMsgId, setSpeakingMsgId] = useState<string | null>(null);
  const [copiedMsgId, setCopiedMsgId] = useState<string | null>(null);

  useEffect(() => {
    if (!isSpeaking) {
      setSpeakingMsgId(null);
    }
  }, [isSpeaking]);

  const handlePlayMessage = (msgId: string, text: string) => {
    setSpeakingMsgId(msgId);
    onSpeakText(text);
  };

  const handleCopyText = (text: string, msgId: string) => {
    try {
      navigator.clipboard.writeText(text);
      setCopiedMsgId(msgId);
      setTimeout(() => setCopiedMsgId(null), 2000);
    } catch {}
  };

  // Pre-index target vocabulary for subtle pedagogical highlights
  const targetWordsSet = useMemo(() => {
    const set = new Set<string>();
    if (currentTopic?.suggestedWords) {
      for (const sw of currentTopic.suggestedWords) {
        set.add(sw.word.toLowerCase());
      }
    }
    return set;
  }, [currentTopic]);

  // Clean, high-fidelity inline text rendering preserving natural spacing & punctuation
  const renderInteractiveText = (text: string) => {
    const words = text.split(" ");

    return (
      <span className="text-xs sm:text-sm font-normal leading-relaxed text-slate-800 dark:text-slate-100 select-text">
        {words.map((chunk, idx) => {
          const match = chunk.match(/^([^a-zA-Z0-9']*)([a-zA-Z0-9']+)([^a-zA-Z0-9']*)$/);
          const isLast = idx === words.length - 1;

          if (!match) {
            return (
              <React.Fragment key={idx}>
                <span>{chunk}</span>
                {!isLast && " "}
              </React.Fragment>
            );
          }

          const [, prefix, coreWord, suffix] = match;
          const isTarget = targetWordsSet.has(coreWord.toLowerCase());

          return (
            <React.Fragment key={idx}>
              {prefix}
              <span
                onClick={() => onWordClick(coreWord)}
                title="Nhấp tra nghĩa & nghe phát âm"
                className={`cursor-pointer transition-colors ${
                  isTarget
                    ? "font-bold text-[#0059bb] dark:text-sky-400 hover:opacity-80"
                    : "hover:text-[#0059bb] dark:hover:text-sky-400"
                }`}
              >
                {coreWord}
              </span>
              {suffix}
              {!isLast && " "}
            </React.Fragment>
          );
        })}
      </span>
    );
  };

  return (
    <div className="flex flex-col flex-1 min-h-0 min-w-0 space-y-2">
      {/* Header Trong Khung Chat */}
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-1.5 gap-2 shrink-0 select-none">
        <div className="flex items-center gap-2 min-w-0">
          <span className="px-2 py-0.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-300 font-bold text-xs font-mono border border-blue-200/60 dark:border-blue-800/40">
            AI Tutor
          </span>
          <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display truncate">
            {currentTopic.name} ({currentTopic.nameEn})
          </span>
          <span className="text-[11px] text-slate-400 dark:text-slate-500 hidden md:inline truncate">
            • Nhấp từ tiếng Anh để tra từ điển & nghe đọc
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
          title={soundEnabled ? "Tắt âm thanh phát" : "Bật âm thanh phát"}
        >
          {soundEnabled ? (
            <Volume2 className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400" />
          ) : (
            <VolumeX className="w-3.5 h-3.5" />
          )}
          <span className="hidden sm:inline">{soundEnabled ? "Bật âm" : "Tắt âm"}</span>
        </button>
      </div>

      {/* Scrollable Chat Stream Box */}
      <div className="flex-1 min-h-[260px] lg:min-h-0 overflow-y-auto space-y-3 p-1 pr-1.5 scrollbar-thin">
        {messages.map((msg) => {
          const isAi = msg.role === "ai";
          const isTranslated = showTranslations[msg.id];
          const isCurrentSpeaking = speakingMsgId === msg.id && isSpeaking;

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
                className={`space-y-1.5 max-w-[92%] sm:max-w-[85%] ${
                  isAi ? "w-fit" : "items-end flex flex-col ml-auto w-fit"
                }`}
              >
                {/* Chat Bubble with Natural Width and Tail Corner */}
                <div
                  className={`p-3 sm:p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-2xs transition-all w-fit ${
                    isAi
                      ? "bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 text-slate-900 dark:text-white rounded-tl-xs"
                      : "bg-[#0059bb] text-white shadow-xs rounded-tr-xs"
                  }`}
                >
                  {isAi ? (
                    renderInteractiveText(msg.text)
                  ) : (
                    <p className="leading-relaxed">{msg.text}</p>
                  )}
                </div>

                {/* Vietnamese Translation: Clean natural text without box/block */}
                {isAi && isTranslated && msg.vietnameseTranslation && (
                  <motion.div
                    initial={{ opacity: 0, y: -2 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-slate-600 dark:text-slate-300 flex items-start gap-1.5 px-1 pt-0.5 leading-relaxed"
                  >
                    <span className="font-semibold text-[#0059bb] dark:text-sky-400 shrink-0">
                      Dịch:
                    </span>
                    <span className="font-normal text-slate-700 dark:text-slate-300 italic">
                      {msg.vietnameseTranslation}
                    </span>
                  </motion.div>
                )}

                {/* AI Coach Feedback for User Message: Unified, clean, direct */}
                {!isAi && (msg.grammarCorrection?.hasError || msg.betterPhrasing) && (
                  <div className="p-2.5 sm:p-3 rounded-2xl bg-slate-50/95 dark:bg-slate-900/95 border border-slate-200/80 dark:border-slate-800 text-xs space-y-2 text-left w-full max-w-md shadow-2xs">
                    {/* Section 1: Grammar Correction (if errors exist) */}
                    {msg.grammarCorrection?.hasError && (
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-800 dark:text-slate-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                          <span>Sửa ngữ pháp:</span>
                        </div>
                        <div className="flex items-center flex-wrap gap-1.5 text-xs">
                          <span className="line-through text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 px-2 py-0.5 rounded-lg border border-rose-200/60 dark:border-rose-900/30 font-medium">
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

                    {/* Section 2: More Natural Native Phrasing (Conditional Divider only when grammar error present) */}
                    {msg.betterPhrasing && (
                      <div
                        className={`space-y-1.5 ${
                          msg.grammarCorrection?.hasError
                            ? "pt-2 border-t border-slate-200/60 dark:border-slate-800"
                            : ""
                        }`}
                      >
                        <div className="flex items-center gap-1 text-xs font-semibold text-[#0059bb] dark:text-sky-400">
                          <Sparkles className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400" />
                          <span>Diễn đạt tự nhiên hơn:</span>
                        </div>
                        <div className="flex items-start justify-between gap-2 pt-0.5">
                          <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-100 leading-relaxed select-text">
                            {msg.betterPhrasing
                              .replace(/^["']|["']$/g, "")
                              .replace(
                                /^(A more natural way to say that (would be|is)|You could say|A better phrasing is|Try saying|Consider saying),?\s*/i,
                                ""
                              )
                              .replace(/^["']|["']$/g, "")
                              .trim()}
                          </p>
                          <button
                            type="button"
                            onClick={() => {
                              const cleanText = msg.betterPhrasing
                                ?.replace(/^["']|["']$/g, "")
                                .replace(
                                  /^(A more natural way to say that (would be|is)|You could say|A better phrasing is|Try saying|Consider saying),?\s*/i,
                                  ""
                                )
                                .replace(/^["']|["']$/g, "")
                                .trim();
                              if (cleanText) onSpeakText(cleanText);
                            }}
                            className="px-2 py-1 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950/50 text-[#0059bb] dark:text-sky-400 flex items-center gap-1 text-xs font-semibold cursor-pointer transition-colors shrink-0"
                            title="Nghe phát âm câu mẫu tự nhiên"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Nghe mẫu</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* AI Action Strip: Thanh tác vụ thanh thoát, không đóng khối */}
                {isAi && (
                  <div className="flex items-center gap-3.5 pt-0.5 px-1 select-none text-xs">
                    {/* 1. Nút Nghe lại */}
                    <button
                      type="button"
                      onClick={() => handlePlayMessage(msg.id, msg.text)}
                      className={`font-semibold flex items-center gap-1.5 cursor-pointer transition-colors ${
                        isCurrentSpeaking
                          ? "text-[#0059bb] dark:text-sky-400 font-bold"
                          : "text-slate-500 hover:text-[#0059bb] dark:text-slate-400 dark:hover:text-sky-300"
                      }`}
                      title="Nghe AI phát âm lại câu này"
                    >
                      {isCurrentSpeaking ? (
                        <>
                          <div className="flex items-center gap-0.5">
                            <span className="w-0.5 h-2.5 bg-[#0059bb] dark:bg-sky-400 rounded-full animate-pulse" />
                            <span
                              className="w-0.5 h-3.5 bg-[#0059bb] dark:bg-sky-400 rounded-full animate-pulse"
                              style={{ animationDelay: "150ms" }}
                            />
                            <span
                              className="w-0.5 h-2 bg-[#0059bb] dark:bg-sky-400 rounded-full animate-pulse"
                              style={{ animationDelay: "300ms" }}
                            />
                          </div>
                          <span>Đang phát...</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400" strokeWidth={2} />
                          <span>Nghe lại</span>
                        </>
                      )}
                    </button>

                    {/* 2. Nút Xem bản dịch */}
                    {msg.vietnameseTranslation && (
                      <button
                        type="button"
                        onClick={() => onToggleTranslation(msg.id)}
                        className={`font-semibold flex items-center gap-1.5 cursor-pointer transition-colors ${
                          isTranslated
                            ? "text-[#0059bb] dark:text-sky-400 font-bold"
                            : "text-slate-500 hover:text-[#0059bb] dark:text-slate-400 dark:hover:text-sky-300"
                        }`}
                        title={isTranslated ? "Ẩn bản dịch tiếng Việt" : "Xem bản dịch tiếng Việt"}
                      >
                        <Languages className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400" strokeWidth={2} />
                        <span>{isTranslated ? "Ẩn dịch" : "Xem bản dịch"}</span>
                      </button>
                    )}

                    {/* 3. Nút Sao chép */}
                    <button
                      type="button"
                      onClick={() => handleCopyText(msg.text, msg.id)}
                      className="font-medium text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 flex items-center gap-1 cursor-pointer transition-colors"
                      title="Sao chép nội dung câu"
                    >
                      {copiedMsgId === msg.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-500" strokeWidth={2.2} />
                          <span className="text-emerald-600 dark:text-emerald-400 text-[11px]">Đã chép</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" strokeWidth={1.8} />
                          <span className="text-[11px]">Sao chép</span>
                        </>
                      )}
                    </button>
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
          <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-200/60 dark:border-purple-800/40 text-purple-700 dark:text-purple-300 text-xs font-bold w-fit shadow-2xs">
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
            <span>AI đang suy nghĩ câu trả lời...</span>
          </div>
        )}
        <div ref={chatBottomRef} />
      </div>
    </div>
  );
}
