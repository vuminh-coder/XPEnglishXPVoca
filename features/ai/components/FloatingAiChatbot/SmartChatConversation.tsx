"use client";

import React, { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useAiChatbotStore, ChatMessage } from "@/stores/aiChatbotStore";
import RoadmapActionCard from "./cards/RoadmapActionCard";
import RecommendationActionCard from "./cards/RecommendationActionCard";
import {
  Send,
  Mic,
  MicOff,
  Volume2,
  Copy,
  Check,
  Sparkles,
  Bot,
  User,
  RotateCcw,
  Compass,
  Zap,
  BookOpen,
} from "lucide-react";

export default function SmartChatConversation() {
  const pathname = usePathname();
  const {
    messages,
    isLoading,
    sendMessage,
    triggerRoadmapCard,
    triggerRecommendationCard,
    fetchDbRecommendations,
    dbData,
  } = useAiChatbotStore();

  const [input, setInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const recognitionRef = useRef<any>(null);

  // Auto-scroll to bottom on message change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Sync DB on mount
  useEffect(() => {
    fetchDbRecommendations(pathname);
  }, [pathname, fetchDbRecommendations]);

  // Handle Speech-to-Text
  const toggleRecording = () => {
    if (typeof window === "undefined") return;

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Trình duyệt của bạn chưa hỗ trợ nhận diện giọng nói Web Speech API.");
      return;
    }

    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = "vi-VN"; // Default Vietnamese speech recognition
      recognition.continuous = false;
      recognition.interimResults = true;

      recognition.onstart = () => {
        setIsRecording(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join("");
        setInput(transcript);
      };

      recognition.onerror = (event: any) => {
        console.warn("Speech recognition error:", event.error);
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (e) {
      console.warn("Could not start speech recognition:", e);
      setIsRecording(false);
    }
  };

  // Handle Text-to-Speech (read English or Vietnamese)
  const handleSpeak = (id: string, text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    if (speakingId === id) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const cleanText = text
      .replace(/[*_#`~>]/g, "")
      .replace(/\[.*?\]\(.*?\)/g, "");

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 0.95;

    // Detect if text is mostly English or Vietnamese
    const hasVietnamese = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i.test(
      cleanText
    );
    utterance.lang = hasVietnamese ? "vi-VN" : "en-US";

    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);

    setSpeakingId(id);
    window.speechSynthesis.speak(utterance);
  };

  // Handle Copy text
  const handleCopy = (id: string, text: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;
    const textToSend = input.trim();
    setInput("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
    sendMessage(textToSend, pathname);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Quick Action Chips definitions
  const QUICK_COMMANDS = [
    {
      label: "🗺️ Lộ trình hôm nay",
      action: () => triggerRoadmapCard(),
    },
    {
      label: "⚡ Gợi ý bài học tiếp",
      action: () => triggerRecommendationCard(),
    },
    {
      label: "🔄 Ôn tập từ vựng SRS",
      action: () => sendMessage("Tôi muốn kiểm tra từ vựng cần ôn tập hôm nay", pathname),
    },
    {
      label: "❓ Giải thích ngữ pháp",
      action: () => {
        setInput("Giải thích ngữ pháp: ");
        textareaRef.current?.focus();
      },
    },
  ];

  return (
    <div className="flex flex-col h-full bg-slate-50/50 dark:bg-slate-950/50">
      {/* 1. Conversational Stream */}
      <div className="flex-1 overflow-y-auto p-3.5 space-y-3.5 hide-scrollbar">
        {messages.map((msg) => {
          const isAi = msg.role === "ai";

          return (
            <div
              key={msg.id}
              className={`flex gap-2.5 ${isAi ? "items-start" : "items-end justify-end"}`}
            >
              {isAi && (
                <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-[#0059bb] to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[88%] space-y-1.5 ${
                  isAi
                    ? "text-slate-800 dark:text-slate-200"
                    : "bg-[#0059bb] text-white p-3 rounded-2xl rounded-br-xs shadow-xs"
                }`}
              >
                {/* AI Bubble Card */}
                {isAi ? (
                  <div className="p-3 rounded-2xl rounded-tl-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-2">
                    {/* Rich text formatting */}
                    <div className="text-xs leading-relaxed whitespace-pre-line font-medium">
                      {msg.text}
                    </div>

                    {/* Embedded Action Cards */}
                    {msg.cardType === "welcome" && (
                      <div className="pt-1">
                        <RoadmapActionCard data={dbData} />
                      </div>
                    )}
                    {msg.cardType === "roadmap" && (
                      <RoadmapActionCard data={msg.cardData || dbData} />
                    )}
                    {msg.cardType === "recommendation" && (
                      <RecommendationActionCard data={msg.cardData || dbData?.recommendations} />
                    )}

                    {/* Action buttons inside message */}
                    {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                      <div className="pt-2 flex flex-wrap gap-1.5 border-t border-slate-100 dark:border-slate-800/80">
                        {msg.suggestedActions.map((act, i) => (
                          <button
                            key={i}
                            onClick={() => {
                              if (act.prompt) {
                                sendMessage(act.prompt, pathname);
                              } else if (act.path) {
                                window.location.href = act.path;
                              }
                            }}
                            className="px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-900/60 text-[#0059bb] dark:text-sky-300 text-[10.5px] font-bold transition-colors active:scale-95"
                          >
                            {act.label}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* AI Message Footer Utility (TTS Audio & Copy) */}
                    <div className="pt-1 flex items-center justify-end gap-1 text-slate-400">
                      <button
                        onClick={() => handleSpeak(msg.id, msg.text)}
                        title="Nghe phát âm"
                        className={`p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${
                          speakingId === msg.id ? "text-[#0059bb] animate-pulse" : ""
                        }`}
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleCopy(msg.id, msg.text)}
                        title="Sao chép"
                        className="p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      >
                        {copiedId === msg.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-xs leading-relaxed whitespace-pre-wrap font-medium">
                    {msg.text}
                  </div>
                )}
              </div>

              {!isAi && (
                <div className="w-7 h-7 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center shrink-0 shadow-xs mb-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {/* Typing / Thinking Indicator */}
        {isLoading && (
          <div className="flex gap-2.5 items-start">
            <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-[#0059bb] to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-3 rounded-2xl rounded-tl-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex items-center gap-1.5 shadow-xs">
              <div className="w-2 h-2 rounded-full bg-[#0059bb] animate-bounce" />
              <div className="w-2 h-2 rounded-full bg-[#0059bb] animate-bounce [animation-delay:0.15s]" />
              <div className="w-2 h-2 rounded-full bg-[#0059bb] animate-bounce [animation-delay:0.3s]" />
              <span className="text-[11px] text-slate-500 font-medium ml-1">
                AI Mentor đang tư duy...
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* 2. Smart Quick Action Chips Dock */}
      <div className="px-3 py-1.5 bg-white/80 dark:bg-slate-900/80 border-t border-slate-200/60 dark:border-slate-800 backdrop-blur-xs flex items-center gap-1.5 overflow-x-auto hide-scrollbar">
        {QUICK_COMMANDS.map((cmd, idx) => (
          <button
            key={idx}
            onClick={cmd.action}
            disabled={isLoading}
            className="shrink-0 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/50 hover:text-[#0059bb] dark:hover:text-sky-300 text-slate-700 dark:text-slate-300 text-[11px] font-bold transition-all active:scale-95 border border-slate-200/60 dark:border-slate-700/60"
          >
            {cmd.label}
          </button>
        ))}
      </div>

      {/* 3. Input & Voice Control Bar */}
      <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
        <form onSubmit={handleSend} className="flex items-center gap-1.5">
          {/* Voice Microphone Button */}
          <button
            type="button"
            onClick={toggleRecording}
            title={isRecording ? "Dừng ghi âm" : "Nói chuyện bằng Micro"}
            className={`p-2.5 rounded-xl transition-all ${
              isRecording
                ? "bg-rose-500 text-white animate-pulse shadow-md shadow-rose-500/30"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>

          {/* Textarea Input */}
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              rows={1}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                e.target.style.height = "auto";
                e.target.style.height = `${Math.min(e.target.scrollHeight, 100)}px`;
              }}
              onKeyDown={handleKeyDown}
              placeholder={isRecording ? "Đang lắng nghe bạn..." : "Hỏi AI ngữ pháp, từ vựng, lộ trình..."}
              className="w-full px-3 py-2 text-xs bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#0059bb]/30 focus:border-[#0059bb] resize-none text-slate-900 dark:text-white placeholder-slate-400"
            />
          </div>

          {/* Send Button */}
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-2.5 rounded-xl bg-[#0059bb] hover:bg-[#004ba0] disabled:bg-slate-200 dark:disabled:bg-slate-800 disabled:text-slate-400 text-white shadow-xs transition-all active:scale-95 shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
