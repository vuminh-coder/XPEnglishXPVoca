"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAiChatbotStore } from "@/stores/aiChatbotStore";
import RoadmapActionCard from "./cards/RoadmapActionCard";
import RecommendationActionCard from "./cards/RecommendationActionCard";
import {
  Send,
  Mic,
  MicOff,
  Volume2,
  Copy,
  Check,
  Compass,
  Sparkles,
  BookmarkCheck,
  BookOpen,
  Bot,
  Languages,
} from "lucide-react";

// ─── High-End Markdown Renderer with List, Blockquote, Link Support ───
function renderInline(text: string, keyPrefix: string): React.ReactNode[] {
  const tokenRegex = /(\*\*(.+?)\*\*)|(\*(.+?)\*)|(`(.+?)`)|(\[([^\]]+)\]\(([^)]+)\))/g;
  let lastIndex = 0;
  let match;
  const nodes: React.ReactNode[] = [];
  let tokenIdx = 0;

  while ((match = tokenRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    if (match[1]) {
      // **bold**
      nodes.push(
        <strong key={`${keyPrefix}-b-${tokenIdx}`} className="font-bold text-slate-900 dark:text-white">
          {match[2]}
        </strong>
      );
    } else if (match[3]) {
      // *italic*
      nodes.push(
        <em key={`${keyPrefix}-i-${tokenIdx}`} className="italic">
          {match[4]}
        </em>
      );
    } else if (match[5]) {
      // `code`
      nodes.push(
        <code
          key={`${keyPrefix}-c-${tokenIdx}`}
          className="px-1 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[#0059bb] dark:text-sky-300 text-[11.5px] font-mono border border-slate-200/60 dark:border-slate-700/60"
        >
          {match[6]}
        </code>
      );
    } else if (match[7]) {
      // [link](url)
      nodes.push(
        <a
          key={`${keyPrefix}-a-${tokenIdx}`}
          href={match[9]}
          target="_blank"
          rel="noreferrer"
          className="text-[#0059bb] dark:text-sky-400 hover:underline font-semibold"
        >
          {match[8]}
        </a>
      );
    }

    lastIndex = match.index + match[0].length;
    tokenIdx++;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

function renderMarkdown(text: string): React.ReactNode {
  const lines = text.split("\n");
  const elements: React.ReactNode[] = [];

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    if (!trimmed) {
      elements.push(<div key={`sp-${i}`} className="h-1" />);
      continue;
    }

    // Blockquote: > quote
    if (trimmed.startsWith("> ")) {
      elements.push(
        <div
          key={`q-${i}`}
          className="my-1 pl-2.5 py-1 border-l-2 border-[#0059bb] dark:border-sky-400 text-slate-600 dark:text-slate-300 italic text-[12px] bg-blue-50/40 dark:bg-blue-950/20 rounded-r"
        >
          {renderInline(trimmed.slice(2), `q-${i}`)}
        </div>
      );
      continue;
    }

    // Bullet list: - or *
    if (/^[-*]\s+/.test(trimmed)) {
      const content = trimmed.replace(/^[-*]\s+/, "");
      elements.push(
        <div key={`li-${i}`} className="flex items-start gap-1.5 my-0.5 pl-0.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0059bb] dark:bg-sky-400 shrink-0 mt-1.5" />
          <div className="flex-1 text-[13px] leading-snug">{renderInline(content, `li-${i}`)}</div>
        </div>
      );
      continue;
    }

    // Numbered list: 1. 2. etc.
    const numMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
    if (numMatch) {
      elements.push(
        <div key={`nl-${i}`} className="flex items-start gap-1.5 my-0.5 pl-0.5">
          <span className="font-bold text-[#0059bb] dark:text-sky-400 shrink-0 text-[12px]">
            {numMatch[1]}.
          </span>
          <div className="flex-1 text-[13px] leading-snug">{renderInline(numMatch[2], `nl-${i}`)}</div>
        </div>
      );
      continue;
    }

    // Regular line
    elements.push(
      <p key={`p-${i}`} className="text-[13px] leading-relaxed">
        {renderInline(rawLine, `p-${i}`)}
      </p>
    );
  }

  return <div className="space-y-1">{elements}</div>;
}

export default function SmartChatConversation() {
  const pathname = usePathname();
  const router = useRouter();
  const {
    messages,
    isLoading,
    sendMessage,
    triggerRoadmapCard,
    triggerRecommendationCard,
    fetchDbRecommendations,
    dbData,
    setIsOpen,
  } = useAiChatbotStore();

  const [input, setInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [voiceLang, setVoiceLang] = useState<"en-US" | "vi-VN">("en-US");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    fetchDbRecommendations(pathname);
  }, [pathname, fetchDbRecommendations]);

  const toggleRecording = () => {
    if (typeof window === "undefined") return;

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      // Fallback message in input placeholder rather than intrusive alert()
      setInput("Trình duyệt chưa hỗ trợ Web Speech API.");
      return;
    }

    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = voiceLang;
      recognition.continuous = false;
      recognition.interimResults = true;

      recognition.onstart = () => setIsRecording(true);
      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join("");
        setInput(transcript);
      };
      recognition.onerror = () => setIsRecording(false);
      recognition.onend = () => setIsRecording(false);

      recognitionRef.current = recognition;
      recognition.start();
    } catch {
      setIsRecording(false);
    }
  };

  const toggleVoiceLang = () => {
    setVoiceLang((prev) => (prev === "en-US" ? "vi-VN" : "en-US"));
  };

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

    const hasVietnamese = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i.test(
      cleanText
    );
    utterance.lang = hasVietnamese ? "vi-VN" : "en-US";

    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);

    setSpeakingId(id);
    window.speechSynthesis.speak(utterance);
  };

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

  const handleQuickCommand = (id: string) => {
    switch (id) {
      case "roadmap":
        triggerRoadmapCard();
        break;
      case "recommendation":
        triggerRecommendationCard();
        break;
      case "srs":
        sendMessage("Tôi muốn kiểm tra từ vựng cần ôn tập hôm nay", pathname);
        break;
      case "grammar":
        setInput("Giải thích ngữ pháp: ");
        textareaRef.current?.focus();
        break;
    }
  };

  // Quick Action Commands — Lucide icons only, no raw emojis
  const QUICK_COMMANDS = [
    {
      id: "roadmap",
      label: "Lộ trình hôm nay",
      icon: <Compass className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400" />,
    },
    {
      id: "recommendation",
      label: "Gợi ý bài học",
      icon: <Sparkles className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400" />,
    },
    {
      id: "srs",
      label: "Ôn từ vựng SRS",
      icon: <BookmarkCheck className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400" />,
    },
    {
      id: "grammar",
      label: "Hỏi ngữ pháp",
      icon: <BookOpen className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400" />,
    },
  ];

  return (
    <div className="flex flex-col h-full bg-slate-50/40 dark:bg-slate-950/40">
      {/* 1. Conversational Stream */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2.5 hide-scrollbar">
        {messages.map((msg) => {
          const isAi = msg.role === "ai";

          return (
            <div
              key={msg.id}
              className={`flex gap-2 ${isAi ? "items-start" : "items-end justify-end"}`}
            >
              {isAi && (
                <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900/50 text-[#0059bb] dark:text-sky-400 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                  <Bot className="w-4 h-4 stroke-[1.8]" />
                </div>
              )}

              <div
                className={`max-w-[88%] space-y-1 ${
                  isAi
                    ? "text-slate-800 dark:text-slate-200"
                    : "bg-[#0059bb] text-white px-3.5 py-2.5 rounded-2xl rounded-br-xs shadow-xs"
                }`}
              >
                {/* AI Bubble Card */}
                {isAi ? (
                  <div className="p-3 rounded-2xl rounded-tl-xs bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 shadow-xs space-y-2">
                    {/* Rich text with markdown rendering */}
                    <div className="text-[13px] leading-relaxed font-medium">
                      {renderMarkdown(msg.text)}
                    </div>

                    {/* Embedded Action Cards */}
                    {msg.cardType === "welcome" && (
                      <div className="pt-0.5">
                        <RoadmapActionCard data={dbData} />
                      </div>
                    )}
                    {msg.cardType === "roadmap" && (
                      <RoadmapActionCard data={msg.cardData || dbData} />
                    )}
                    {msg.cardType === "recommendation" && (
                      <RecommendationActionCard data={msg.cardData || dbData?.recommendations} />
                    )}

                    {/* Suggested action buttons — with router.push SPA navigation */}
                    {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                      <div className="pt-2 flex flex-wrap gap-1.5 border-t border-slate-100 dark:border-slate-800">
                        {msg.suggestedActions.map((act, i) => (
                          <button
                            key={i}
                            onClick={() => {
                              if (act.prompt) {
                                sendMessage(act.prompt, pathname);
                              } else if (act.path) {
                                setIsOpen(false);
                                router.push(act.path);
                              }
                            }}
                            className="h-7 px-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/40 text-[#0059bb] dark:text-sky-300 text-xs font-semibold transition-colors cursor-pointer flex items-center"
                          >
                            {act.label.replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, "").trim()}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* AI Message Footer Utility (TTS Audio & Copy) */}
                    <div className="pt-1 flex items-center justify-end gap-1 text-slate-400 border-t border-slate-100/80 dark:border-slate-800/60">
                      <button
                        onClick={() => handleSpeak(msg.id, msg.text)}
                        aria-label="Nghe phát âm"
                        title="Nghe phát âm"
                        className={`p-1.5 rounded-md hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer ${
                          speakingId === msg.id ? "text-[#0059bb] animate-pulse" : ""
                        }`}
                      >
                        <Volume2 className="w-3.5 h-3.5 stroke-[1.8]" />
                      </button>
                      <button
                        onClick={() => handleCopy(msg.id, msg.text)}
                        aria-label="Sao chép nội dung"
                        title="Sao chép"
                        className="p-1.5 rounded-md hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
                      >
                        {copiedId === msg.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-500 stroke-[2]" />
                        ) : (
                          <Copy className="w-3.5 h-3.5 stroke-[1.8]" />
                        )}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-[13px] leading-relaxed whitespace-pre-wrap font-medium">
                    {msg.text}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Skeleton Shimmer Typing Indicator */}
        {isLoading && (
          <div className="flex gap-2 items-start">
            <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900/50 text-[#0059bb] dark:text-sky-400 flex items-center justify-center shrink-0 shadow-2xs">
              <Bot className="w-4 h-4 stroke-[1.8]" />
            </div>
            <div className="px-3.5 py-3 rounded-2xl rounded-tl-xs bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 shadow-xs space-y-2 w-52">
              <div className="h-3 rounded-full bg-slate-200 dark:bg-slate-700 animate-pulse" />
              <div className="h-3 rounded-full bg-slate-200 dark:bg-slate-700 animate-pulse w-3/4" />
              <div className="h-2.5 rounded-full bg-slate-200 dark:bg-slate-700 animate-pulse w-1/2" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* 2. Quick Action Chips Dock with fade mask */}
      <div className="relative border-t border-slate-100 dark:border-slate-800/80">
        <div className="px-3 py-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xs flex items-center gap-1.5 overflow-x-auto hide-scrollbar">
          {QUICK_COMMANDS.map((cmd, idx) => (
            <button
              key={idx}
              onClick={() => handleQuickCommand(cmd.id)}
              disabled={isLoading}
              className="shrink-0 h-7.5 px-3 rounded-full bg-slate-50 dark:bg-slate-800/70 hover:bg-blue-50 dark:hover:bg-blue-950/50 hover:border-[#0059bb]/40 hover:text-[#0059bb] dark:hover:text-sky-300 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-all active:scale-95 border border-slate-200/70 dark:border-slate-700/60 flex items-center gap-1.5 cursor-pointer shadow-2xs whitespace-nowrap"
            >
              {cmd.icon}
              <span>{cmd.label}</span>
            </button>
          ))}
        </div>
        {/* Fade mask on right edge */}
        <div className="absolute top-0 right-0 bottom-0 w-6 bg-gradient-to-l from-white dark:from-slate-900 to-transparent pointer-events-none" />
      </div>

      {/* 3. Input & Voice Control Bar */}
      <div className="p-2.5 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
        <form onSubmit={handleSend} className="flex items-center gap-1.5">
          {/* Dual-Mode Language Selector + Mic Button */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={toggleVoiceLang}
              title={`Ngôn ngữ nhận diện giọng nói: ${voiceLang === "en-US" ? "Tiếng Anh (en-US)" : "Tiếng Việt (vi-VN)"}`}
              className="h-[38px] px-2 rounded-xl text-[10.5px] font-bold border border-slate-200/90 dark:border-slate-700/80 bg-slate-50/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-750 flex items-center gap-1 transition-colors cursor-pointer shrink-0"
            >
              <Languages className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400" />
              <span>{voiceLang === "en-US" ? "EN" : "VI"}</span>
            </button>

            <button
              type="button"
              onClick={toggleRecording}
              aria-label={isRecording ? "Dừng ghi âm" : "Nói chuyện bằng Micro"}
              title={isRecording ? "Dừng ghi âm" : `Nói tiếng ${voiceLang === "en-US" ? "Anh" : "Việt"}`}
              className={`w-[38px] h-[38px] rounded-xl flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                isRecording
                  ? "bg-rose-500 text-white animate-pulse shadow-md shadow-rose-500/20"
                  : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/90 dark:border-slate-700/80 bg-slate-50/80 dark:bg-slate-800/80"
              }`}
            >
              {isRecording ? (
                <MicOff className="w-4 h-4 stroke-[2]" />
              ) : (
                <Mic className="w-4 h-4 stroke-[2]" />
              )}
            </button>
          </div>

          {/* Textarea Input with Fixed Baseline, No-Scrollbar 1-Line & Truncated Placeholder */}
          <div className="flex-1 relative min-w-0">
            <label htmlFor="ai-chat-input" className="sr-only">
              Nhập câu hỏi hoặc yêu cầu học tập cho trợ lý AI
            </label>
            <textarea
              id="ai-chat-input"
              ref={textareaRef}
              rows={1}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                e.target.style.height = "auto";
                const newHeight = Math.min(Math.max(e.target.scrollHeight, 38), 90);
                e.target.style.height = `${newHeight}px`;
                e.target.style.overflowY = e.target.scrollHeight > 90 ? "auto" : "hidden";
              }}
              onKeyDown={handleKeyDown}
              placeholder={
                isRecording
                  ? `Đang lắng nghe tiếng ${voiceLang === "en-US" ? "Anh" : "Việt"}...`
                  : "Hỏi ngữ pháp, từ vựng..."
              }
              className="w-full h-[38px] min-h-[38px] max-h-[90px] px-3 py-[8px] text-[13px] leading-[20px] bg-slate-50 dark:bg-slate-800/60 border border-slate-200/90 dark:border-slate-700/80 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#0059bb]/25 focus:border-[#0059bb] resize-none text-slate-800 dark:text-slate-100 placeholder:truncate placeholder-slate-400 overflow-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            />
          </div>

          {/* Send Button (Touch-Friendly 38px, Aligned Baseline) */}
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            aria-label="Gửi tin nhắn"
            title="Gửi"
            className="w-[38px] h-[38px] rounded-xl bg-[#0059bb] hover:bg-[#004ba0] disabled:opacity-40 text-white flex items-center justify-center transition-all active:scale-95 shrink-0 cursor-pointer shadow-xs shadow-[#0059bb]/20"
          >
            <Send className="w-4 h-4 stroke-[2]" />
          </button>
        </form>
      </div>
    </div>
  );
}
