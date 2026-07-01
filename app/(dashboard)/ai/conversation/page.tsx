'use client';
import React, { useState, useEffect } from 'react';
import { useAuthStore } from '@/lib/store/authStore';
import { Bot, Utensils, Briefcase, Plane, Cpu, Send, MessageSquare } from 'lucide-react';

const TOPIC_ICONS: Record<string, React.ReactNode> = {
  'at1': <Utensils className="w-5 h-5 text-amber-500" strokeWidth={1.8} />,
  'at2': <Briefcase className="w-5 h-5 text-blue-500" strokeWidth={1.8} />,
  'at3': <Plane className="w-5 h-5 text-emerald-500" strokeWidth={1.8} />,
  'at4': <Cpu className="w-5 h-5 text-purple-500" strokeWidth={1.8} />,
};

export default function ConversationPage() {
  const { awardXp } = useAuthStore();

  const aiTopics = [
    { id: 'at1', name: 'Gọi đồ ăn', nameEn: 'Ordering Food', description: 'Luyện đặt món tại nhà hàng', level: 'Beginner' },
    { id: 'at2', name: 'Phỏng vấn xin việc', nameEn: 'Job Interview', description: 'Chuẩn bị cho buổi phỏng vấn', level: 'Intermediate' },
    { id: 'at3', name: 'Du lịch', nameEn: 'Traveling', description: 'Hỏi đường, đặt khách sạn', level: 'Beginner' },
    { id: 'at4', name: 'Thảo luận công nghệ', nameEn: 'Tech Discussion', description: 'Nói về AI, blockchain, apps', level: 'Advanced' }
  ];

  const [messages, setMessages] = useState([
    { role: 'ai', text: "Hi! I'm your AI speaking companion. Please select a topic on the left to start practicing, or write anything you want!" }
  ]);
  const [input, setInput] = useState('');
  const [currentTopic, setCurrentTopic] = useState<string | null>(null);
  const [isAiTyping, setIsAiTyping] = useState(false);

  const startTopic = (topicId: string) => {
    const topic = aiTopics.find(t => t.id === topicId);
    if (!topic) return;

    setCurrentTopic(topicId);
    setIsAiTyping(true);
    setMessages([]);

    setTimeout(() => {
      setIsAiTyping(false);
      setMessages([
        { role: 'ai', text: `Let's practice the topic: "${topic.nameEn}". I will start: "Hello, ready to talk about this topic?"` }
      ]);
    }, 1000);
  };

  const sendMessage = async () => {
    if (!input.trim() || isAiTyping) return;

    const userMsg = { role: 'user', text: input };
    const currentMessages = [...messages, userMsg];
    setMessages(currentMessages);
    setInput('');
    setIsAiTyping(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: currentMessages })
      });
      const data = await res.json();
      
      setIsAiTyping(false);
      if (data.success && data.reply) {
        setMessages(prev => [...prev, { role: 'ai', text: data.reply }]);
        awardXp(10);
      } else {
        setMessages(prev => [...prev, { role: 'ai', text: "Sorry, I had trouble understanding that. Let's try again!" }]);
      }
    } catch (err) {
      console.error("AI chat error:", err);
      setIsAiTyping(false);
      setMessages(prev => [...prev, { role: 'ai', text: "Network connection is unstable. Please check your network and try again!" }]);
    }
  };

  useEffect(() => {
    const container = document.getElementById('ai-messages-container');
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages, isAiTyping]);

  return (
    <div className="animate-fade-in">
      <div className="page-header animate-fade-in-down mb-8">
        <h1 className="page-title text-3xl font-extrabold tracking-tight">Hội thoại thông minh cùng AI</h1>
        <p className="page-subtitle text-muted max-w-xl" style={{ marginTop: '6px' }}>
          Luyện nói và gõ tiếng Anh phản xạ cùng người bạn đồng hành AI. Nhận +10 XP cho mỗi câu trả lời.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Topics — Double-Bezel */}
        <div className="bezel h-fit">
          <div className="bezel-inner p-5 flex flex-col gap-4">
            <h3 className="text-[11px] font-extrabold text-gray-500 uppercase tracking-[0.15em]">
              Chủ đề hội thoại
            </h3>
            <div className="flex flex-col gap-3">
              {aiTopics.map(t => {
                const isActive = currentTopic === t.id;
                return (
                  <div 
                    key={t.id} 
                    className={`group flex items-center gap-3.5 p-3.5 rounded-[calc(var(--radius-3xl)-6px)] border cursor-pointer tactile ${
                      isActive 
                        ? 'bg-cyan-50/50 dark:bg-cyan-950/10 border-cyan-300 dark:border-cyan-800' 
                        : 'bg-white dark:bg-neutral-900 border-black/[0.04] dark:border-white/[0.04]'
                    }`}
                    style={{ transition: 'all 500ms cubic-bezier(0.32, 0.72, 0, 1)' }}
                    onClick={() => startTopic(t.id)}
                  >
                    <div className={`icon-well ${isActive ? 'bg-cyan-50 dark:bg-cyan-950/30' : 'bg-neutral-100 dark:bg-neutral-800'}`} style={{ transition: 'background 500ms cubic-bezier(0.32, 0.72, 0, 1)' }}>
                      {TOPIC_ICONS[t.id]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-bold text-gray-900 dark:text-gray-100 truncate">{t.name}</div>
                      <div className="text-[10px] text-muted font-medium truncate">{t.description}</div>
                    </div>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${
                      t.level === 'Beginner' ? 'border-emerald-200 dark:border-emerald-900/30 text-emerald-500 bg-emerald-50 dark:bg-emerald-950/20' :
                      t.level === 'Intermediate' ? 'border-amber-200 dark:border-amber-900/30 text-amber-500 bg-amber-50 dark:bg-amber-950/20' :
                      'border-red-200 dark:border-red-900/30 text-red-500 bg-red-50 dark:bg-red-950/20'
                    }`}>
                      {t.level}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Chat Arena — Double-Bezel */}
        <div className="lg:col-span-2 bezel">
          <div className="bezel-inner flex flex-col relative overflow-hidden">
            {/* Accent bar */}
            <div className="h-[3px] bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500"></div>

            <div className="flex items-center justify-between p-5 pb-4 border-b border-black/[0.04] dark:border-white/[0.04]">
              <div className="flex items-center gap-3">
                <div className="relative">
                  {isAiTyping && (
                    <span className="absolute inset-0 rounded-full bg-cyan-400 animate-ping opacity-50"></span>
                  )}
                  <div className="w-10 h-10 bg-gradient-to-tr from-cyan-400 to-blue-500 rounded-full flex items-center justify-center relative z-10 shadow-sm">
                    <Bot className="w-5 h-5 text-white" strokeWidth={2} />
                  </div>
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-900 dark:text-gray-100">Companion AI</div>
                  <div className="text-[10px] text-muted font-semibold tracking-wide flex items-center gap-1.5 mt-0.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${isAiTyping ? 'bg-amber-400 animate-pulse' : 'bg-emerald-500'}`}></span>
                    {isAiTyping ? 'AI đang soạn câu trả lời...' : 'Đang trực tuyến'}
                  </div>
                </div>
              </div>

              {isAiTyping && (
                <div className="flex items-end gap-0.5 h-5 px-3">
                  <div className="w-0.5 h-3 bg-cyan-400 rounded-full animate-[bounce_0.8s_infinite_100ms]"></div>
                  <div className="w-0.5 h-5 bg-cyan-500 rounded-full animate-[bounce_0.8s_infinite_200ms]"></div>
                  <div className="w-0.5 h-7 bg-blue-500 rounded-full animate-[bounce_0.8s_infinite_300ms]"></div>
                  <div className="w-0.5 h-4 bg-cyan-400 rounded-full animate-[bounce_0.8s_infinite_400ms]"></div>
                  <div className="w-0.5 h-2 bg-blue-400 rounded-full animate-[bounce_0.8s_infinite_500ms]"></div>
                </div>
              )}
            </div>

            {/* Messages */}
            <div 
              className="flex flex-col gap-4 overflow-y-auto p-5" 
              id="ai-messages-container" 
              style={{ height: '380px' }}
            >
              {messages.length === 0 && !isAiTyping && (
                <div className="flex flex-col items-center justify-center h-full text-center p-8 opacity-30 select-none">
                  <MessageSquare className="w-12 h-12 mb-3" strokeWidth={1.2} />
                  <p className="text-sm font-bold">Bắt đầu nhập tin nhắn để luyện giao tiếp!</p>
                </div>
              )}

              {messages.map((m, idx) => {
                const isAi = m.role === 'ai';
                return (
                  <div 
                    key={idx} 
                    className={`flex ${isAi ? 'justify-start' : 'justify-end'} animate-fade-in-up`}
                  >
                    <div className={`max-w-sm rounded-[1.25rem] p-4 text-sm border ${
                      isAi 
                        ? 'bg-neutral-50 dark:bg-neutral-900/60 text-gray-800 dark:text-gray-200 rounded-tl-md border-black/[0.04] dark:border-white/[0.04] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]' 
                        : 'bg-gradient-to-tr from-cyan-500 to-blue-500 text-white rounded-tr-md border-cyan-400/20 shadow-sm font-medium'
                    }`}>
                      {m.text}
                    </div>
                  </div>
                );
              })}

              {isAiTyping && (
                <div className="flex justify-start animate-fade-in-up">
                  <div className="flex items-center gap-1.5 bg-neutral-50 dark:bg-neutral-900/60 rounded-[1.25rem] rounded-tl-md py-3 px-5 border border-black/[0.04] dark:border-white/[0.04]">
                    <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 pt-0">
              <div className="flex items-center gap-3 p-1.5 bg-neutral-50/80 dark:bg-neutral-900/40 rounded-full border border-black/[0.04] dark:border-white/[0.04]">
                <input 
                  type="text" 
                  className="flex-1 pl-4 bg-transparent border-none focus:outline-none focus:ring-0 text-sm text-gray-900 dark:text-gray-100 placeholder:text-muted" 
                  placeholder={isAiTyping ? "Vui lòng chờ AI trả lời..." : "Gõ câu trả lời bằng tiếng Anh..."} 
                  value={input}
                  disabled={isAiTyping}
                  onChange={e => setInput(e.target.value)}
                  onKeyPress={e => e.key === 'Enter' && sendMessage()}
                />
                <button 
                  className="flex items-center gap-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full text-xs font-bold py-2.5 px-5 tactile shadow-sm disabled:opacity-40"
                  onClick={sendMessage}
                  disabled={isAiTyping || !input.trim()}
                >
                  <Send className="w-3.5 h-3.5" strokeWidth={2} /> Gửi
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}