"use client";
import React, { useState, useRef, useEffect } from "react";
import { useAiChatbotStore, type ChatMessage } from "@/stores/aiChatbotStore";
import { Send, Sparkles, Copy, Check, Volume2, Mic, MicOff, RotateCcw, Loader2 } from "lucide-react";
import { usePathname } from "next/navigation";

function formatMessageText(text: string) {
  // Simple markdown renderer for bold, lists, and line breaks
  const lines = text.split("\n");
  return lines.map((line, lIdx) => {
    let formatted = line;

    // Check for bullet
    const isBullet = formatted.startsWith("- ") || formatted.startsWith("* ");
    if (isBullet) {
      formatted = formatted.substring(2);
    }

    // Bold parsing
    const parts = formatted.split(/(\*\*.*?\*\*)/g);

    return (
      <div key={lIdx} className={`${isBullet ? "flex items-start gap-1.5 pl-2 my-0.5" : "my-0.5"}`}>
        {isBullet && <span className="text-[#0059bb] dark:text-sky-400 font-bold shrink-0">•</span>}
        <span>
          {parts.map((part, pIdx) => {
            if (part.startsWith("**") && part.endsWith("**")) {
              return (
                <strong key={pIdx} className="font-bold text-slate-900 dark:text-white">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            return <span key={pIdx}>{part}</span>;
          })}
        </span>
      </div>
    );
  });
}

export default function ChatMentorTab() {
  const { messages, isLoading, sendMessage, clearMessages, setActiveTab } = useAiChatbotStore();
  const [input, setInput] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const pathname = usePathname();

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Voice speech-to-text
  const handleToggleVoice = () => {
    if (typeof window === "undefined") return;

    // @ts-expect-error - webkitSpeechRecognition is standard in Chrome/Edge/Safari
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Trình duyệt của bạn chưa hỗ trợ nhận diện giọng nói Web Speech.");
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = "vi-VN";
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInput((prev) => (prev ? `${prev} ${transcript}` : transcript));
        }
      };

      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  const handleSpeak = (text: string) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[*#_`-]/g, "");
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = "vi-VN";
    window.speechSynthesis.speak(utterance);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSend = (textToSend?: string) => {
    const q = textToSend || input;
    if (!q.trim() || isLoading) return;
    sendMessage(q, `Trang hiện tại: ${pathname}`);
    setInput("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const QUICK_PROMPTS = [
    { label: "🗺️ Hôm nay tôi cần học gì?", prompt: "Hôm nay tôi nên học những gì theo lộ trình để đạt mục tiêu tốt nhất?" },
    { label: "⚡ Kiểm tra 5 từ vựng vừa học", prompt: "Tạo một bài quiz mini 3 câu hỏi trắc nghiệm kiểm tra từ vựng tiếng Anh thường gặp nhé!" },
    { label: "💡 Giải thích ngữ pháp này", prompt: "Giải thích giúp tôi cấu trúc ngữ pháp và cách dùng thì Hiện tại đơn vs Hiện tại tiếp diễn." },
    { label: "✍️ Viết lại câu chuẩn bản xứ", prompt: "Hãy giúp tôi viết lại câu tiếng Anh sau sao cho tự nhiên và chuyên nghiệp hơn: " },
  ];

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-slate-50/60 dark:bg-slate-950/60">
      {/* Messages Stream */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3.5 no-scrollbar">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.role === "ai" && (
              <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-[#0059bb] to-[#8b5cf6] text-white flex items-center justify-center shrink-0 text-xs shadow-2xs mt-0.5">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
            )}

            <div className={`max-w-[85%] sm:max-w-[80%] space-y-2`}>
              <div
                className={`p-3 rounded-2xl text-xs sm:text-[13px] leading-relaxed shadow-2xs ${
                  msg.role === "user"
                    ? "bg-[#0059bb] text-white font-medium rounded-tr-xs"
                    : "bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-xs"
                }`}
              >
                {msg.text ? (
                  formatMessageText(msg.text)
                ) : (
                  <div className="flex items-center gap-1.5 py-1 text-slate-400">
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-[#0059bb]" />
                    <span>AI đang phân tích câu trả lời...</span>
                  </div>
                )}
              </div>

              {/* Action Buttons for AI message */}
              {msg.role === "ai" && msg.text && (
                <div className="flex items-center gap-1.5 pl-1">
                  <button
                    type="button"
                    onClick={() => handleCopy(msg.id, msg.text)}
                    className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-[10px] flex items-center gap-1 cursor-pointer"
                    title="Sao chép"
                  >
                    {copiedId === msg.id ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-500" />
                        <span className="text-emerald-500">Đã chép</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Chép</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSpeak(msg.text)}
                    className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-[10px] flex items-center gap-1 cursor-pointer"
                    title="Đọc to bằng giọng nói"
                  >
                    <Volume2 className="w-3 h-3" />
                    <span>Đọc</span>
                  </button>
                </div>
              )}

              {/* Suggested Action Chips */}
              {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {msg.suggestedActions.map((action, aIdx) => (
                    <button
                      key={aIdx}
                      type="button"
                      onClick={() => {
                        if (action.tab) {
                          setActiveTab(action.tab);
                        } else if (action.action === "quiz_vocab") {
                          handleSend("Hãy tạo bài quiz 3 câu trắc nghiệm kiểm tra từ vựng cho tôi ngay bây giờ!");
                        }
                      }}
                      className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-[#0059bb] dark:hover:border-sky-400 text-[#0059bb] dark:text-sky-400 text-[11px] font-semibold transition-all shadow-2xs hover:shadow-xs active:scale-95 cursor-pointer"
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompt Bar (when user has only 1 message or wants suggestions) */}
      {messages.length <= 2 && (
        <div className="p-2.5 border-t border-slate-200/60 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 space-y-1.5">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block px-1">
            Gợi ý câu hỏi nhanh 1-Click:
          </span>
          <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
            {QUICK_PROMPTS.map((qp, qIdx) => (
              <button
                key={qIdx}
                type="button"
                onClick={() => handleSend(qp.prompt)}
                className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-[#0059bb] hover:text-white text-slate-700 dark:text-slate-300 text-[11px] font-medium transition-all shrink-0 cursor-pointer border border-slate-200/70 dark:border-slate-700/60 active:scale-95"
              >
                {qp.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Chat Input Dock */}
      <div className="p-2.5 sm:p-3 border-t border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-b-2xl space-y-2">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-end gap-1.5"
        >
          <div className="flex-1 relative flex items-center">
            <textarea
              ref={textareaRef}
              rows={1}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                e.target.style.height = "auto";
                e.target.style.height = `${Math.min(e.target.scrollHeight, 100)}px`;
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder={isListening ? "Đang lắng nghe bạn nói..." : "Hỏi AI Mentor bất kỳ điều gì... (Enter gửi)"}
              className="w-full max-h-24 py-2 px-3 pr-9 rounded-xl bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700 text-xs sm:text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#0059bb]/20 focus:border-[#0059bb] resize-none transition-all"
            />

            {/* Mic Speech Button */}
            <button
              type="button"
              onClick={handleToggleVoice}
              className={`absolute right-2 w-6 h-6 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
                isListening
                  ? "bg-rose-500 text-white animate-pulse"
                  : "text-slate-400 hover:text-[#0059bb] hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
              title={isListening ? "Đang nghe... Bấm để dừng" : "Nói giọng nói tiếng Việt/Anh"}
            >
              {isListening ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
            </button>
          </div>

          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="h-9 w-9 rounded-xl bg-[#0059bb] hover:bg-[#004899] text-white flex items-center justify-center transition-all shadow-md shadow-[#0059bb]/20 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shrink-0 active:scale-95 font-display"
            title="Gửi câu hỏi"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-3.5 h-3.5 -ml-0.5" />
            )}
          </button>
        </form>

        {/* Footer info bar */}
        <div className="flex items-center justify-between px-1 text-[10px] text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>AI Model 2.0 phản hồi tức thì</span>
          </div>
          {messages.length > 2 && (
            <button
              type="button"
              onClick={clearMessages}
              className="hover:text-slate-600 dark:hover:text-slate-200 flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-2.5 h-2.5" />
              <span>Làm mới đoạn chat</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
