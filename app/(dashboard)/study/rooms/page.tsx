"use client";
import React, { useState, useEffect, useRef } from "react";
import { useAuthStore } from "@/stores/authStore";
import { useNotificationStore } from "@/stores/notificationStore";
import { useUiStore } from "@/stores/uiStore";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Plus,
  Play,
  Pause,
  RotateCcw,
  Send,
  Sparkles,
  Lock,
  Globe,
  Flame,
  Clock,
  LogOut,
  MessageSquare,
  Shield,
  Bot,
  UserCheck,
  CheckCircle2,
  ChevronRight,
  Headphones,
  BookOpen,
  Hash,
  Copy,
  Check,
  X,
} from "lucide-react";
import {
  AppTopHeader,
  HeaderPillContainer,
  HeaderPillItem,
} from "@/shared/components/layout/AppTopHeader";
import { PageEntranceWrapper } from "@/shared/components/feedback/PageEntranceAnimation";

interface StudyRoomMember {
  id: string;
  userId: string;
  status: "FOCUSING" | "RESTING" | "OFFLINE";
  user: {
    id: string;
    fullName: string | null;
    username: string | null;
    avatarEmoji: string | null;
    title: string;
    totalXp: number;
  };
}

interface RoomMessage {
  id: string;
  content: string;
  isAi: boolean;
  isSystem: boolean;
  createdAt: string;
  user?: {
    id: string;
    fullName: string | null;
    username: string | null;
    avatarEmoji: string | null;
  } | null;
}

interface StudyRoom {
  id: string;
  name: string;
  description: string;
  category: string;
  accentColor: string;
  maxMembers: number;
  isPrivate: boolean;
  passcode?: string | null;
  createdAt: string;
  creator: {
    fullName: string | null;
    username: string | null;
    avatarEmoji: string | null;
  };
  members: StudyRoomMember[];
  _count?: {
    members: number;
  };
}

export default function StudyRoomsPage() {
  const { user } = useAuthStore();
  const { addToast } = useNotificationStore();
  const { setSidebarCollapsed } = useUiStore();

  const [rooms, setRooms] = useState<StudyRoom[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);

  // Active in-room workspace state
  const [activeRoom, setActiveRoom] = useState<StudyRoom | null>(null);

  // Automatically manage sidebar collapse when in active study room
  useEffect(() => {
    if (activeRoom) {
      setSidebarCollapsed(true);
    } else {
      setSidebarCollapsed(false);
    }
    return () => {
      setSidebarCollapsed(false);
    };
  }, [activeRoom, setSidebarCollapsed]);
  const [messages, setMessages] = useState<RoomMessage[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [isSending, setIsSending] = useState<boolean>(false);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  // Focus Pomodoro Timer (25 mins)
  const [timerSeconds, setTimerSeconds] = useState<number>(25 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [timerMode, setTimerMode] = useState<"FOCUS" | "BREAK">("FOCUS");

  // Create form state
  const [newRoomName, setNewRoomName] = useState<string>("");
  const [newRoomCategory, setNewRoomCategory] = useState<string>("TOEIC");
  const [newRoomDesc, setNewRoomDesc] = useState<string>("");
  const [newRoomMax, setNewRoomMax] = useState<number>(20);
  const [newRoomIsPrivate, setNewRoomIsPrivate] = useState<boolean>(false);
  const [newRoomPasscode, setNewRoomPasscode] = useState<string>("");

  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // 1. Fetch live rooms
  const fetchRooms = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/study-rooms");
      const json = await res.json();
      if (json.success && Array.isArray(json.rooms)) {
        setRooms(json.rooms);
      }
    } catch (e) {
      console.error("Failed to load study rooms:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  // 2. Fetch room messages when entering room
  useEffect(() => {
    if (!activeRoom) return;

    let isMounted = true;
    const fetchMessages = async () => {
      try {
        const res = await fetch(`/api/study-rooms/${activeRoom.id}/messages`);
        const json = await res.json();
        if (isMounted && json.success && Array.isArray(json.messages)) {
          setMessages(json.messages);
        }
      } catch (e) {
        console.error("Failed to fetch messages:", e);
      }
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 3000); // Polling every 3s for live chat
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [activeRoom]);

  // 3. Auto-scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 4. Pomodoro countdown timer tick
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setIsTimerRunning(false);
      if (timerMode === "FOCUS") {
        setTimerMode("BREAK");
        setTimerSeconds(5 * 60);
        addToast({
          type: "success",
          title: "Hoàn thành 25 phút tập trung! 🎉",
          message: "Hãy nghỉ giải lao 5 phút trước khi tiếp tục chu kỳ tiếp theo.",
        });
      } else {
        setTimerMode("FOCUS");
        setTimerSeconds(25 * 60);
        addToast({
          type: "info",
          title: "Hết giờ nghỉ giải lao! 🚀",
          message: "Bắt đầu 25 phút tập trung cao độ mới nào.",
        });
      }
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timerSeconds, timerMode, addToast]);

  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoomName.trim()) return;

    try {
      const res = await fetch("/api/study-rooms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newRoomName.trim(),
          description: newRoomDesc.trim(),
          category: newRoomCategory,
          maxMembers: newRoomMax,
          isPrivate: newRoomIsPrivate,
          passcode: newRoomIsPrivate ? newRoomPasscode.trim() : null,
        }),
      });
      const json = await res.json();
      if (json.success && json.room) {
        setIsCreateOpen(false);
        setNewRoomName("");
        setNewRoomDesc("");
        setNewRoomPasscode("");
        addToast({
          type: "success",
          title: "Tạo phòng thành công!",
          message: `Phòng ${json.room.name} đã sẵn sàng hoạt động.`,
        });
        fetchRooms();
        setActiveRoom(json.room);
      } else {
        addToast({
          type: "error",
          title: "Tạo phòng thất bại",
          message: json.error || "Vui lòng kiểm tra lại thông tin.",
        });
      }
    } catch (e) {
      console.error(e);
      addToast({
        type: "error",
        title: "Lỗi kết nối",
        message: "Không thể tạo phòng học lúc này.",
      });
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || !activeRoom || isSending) return;

    const text = inputMessage.trim();
    setInputMessage("");
    setIsSending(true);

    try {
      const res = await fetch(`/api/study-rooms/${activeRoom.id}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: text }),
      });
      const json = await res.json();
      if (json.success) {
        setMessages((prev) => {
          const next = [...prev];
          if (json.message) next.push(json.message);
          if (json.aiMessage) next.push(json.aiMessage);
          return next;
        });
      }
    } catch (e) {
      console.error("Send message error:", e);
    } finally {
      setIsSending(false);
    }
  };

  const copyRoomCode = () => {
    if (!activeRoom) return;
    navigator.clipboard.writeText(activeRoom.id);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
    addToast({
      type: "success",
      title: "Đã sao chép mã phòng! 📋",
      message: `Mã phòng: ${activeRoom.id}`,
    });
  };

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  const categories = [
    { id: "ALL", label: "Tất cả" },
    { id: "TOEIC", label: "TOEIC 4K" },
    { id: "IELTS", label: "IELTS Academic" },
    { id: "SPEAKING", label: "Luyện Nói AI" },
    { id: "VOCAB", label: "Từ Vựng & Phản Xạ" },
  ];

  const filteredRooms = rooms.filter((r) => {
    if (selectedCategory === "ALL") return true;
    return r.category === selectedCategory;
  });

  return (
    <div className="space-y-6 pb-20 font-sans antialiased text-slate-800 dark:text-slate-200" suppressHydrationWarning>
      {/* ─── APP TOP HEADER (56px Baseline) ─── */}
      <AppTopHeader
        rightDesktopContent={
          <HeaderPillContainer>
            <HeaderPillItem
              label="Tạo Phòng Mới"
              icon={<Plus className="w-4 h-4 text-emerald-500" />}
              active={isCreateOpen}
              onClick={() => setIsCreateOpen(true)}
            />
          </HeaderPillContainer>
        }
      >
        <HeaderPillContainer>
          <HeaderPillItem
            label="Phòng Học Nhóm"
            icon={<Users className="w-4 h-4 text-[#0059bb] dark:text-sky-400" />}
            active
          />
          <HeaderPillItem
            label="Luyện Tập"
            icon={<BookOpen className="w-4 h-4 text-slate-500" />}
            href="/study"
          />
        </HeaderPillContainer>
      </AppTopHeader>

      <PageEntranceWrapper className="space-y-6">
        {/* ─── WORKSPACE VIEW (IF IN A ROOM) ─── */}
        {activeRoom ? (
          <div className="space-y-6">
            {/* Top Bar of Active Room */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 bg-white dark:bg-[#0c0c0f] border border-slate-200/90 dark:border-slate-800 rounded-2xl shadow-md">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800 text-[#0059bb] dark:text-sky-400 flex items-center justify-center font-black shadow-2xs">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white font-display">
                      {activeRoom.name}
                    </h1>
                    <span className="px-2.5 py-0.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800 text-[#0059bb] dark:text-sky-400 text-[10px] font-black uppercase">
                      {activeRoom.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5 font-medium">
                    <span>Mã phòng: <strong className="font-mono text-slate-900 dark:text-white">{activeRoom.id}</strong></span>
                    <button
                      onClick={copyRoomCode}
                      className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                      title="Sao chép mã phòng"
                    >
                      {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setActiveRoom(null)}
                className="px-4 h-10 rounded-xl font-bold text-xs text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/30 hover:bg-rose-100 dark:hover:bg-rose-900/50 border border-rose-200 dark:border-rose-900/50 transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer shadow-2xs"
              >
                <LogOut className="w-3.5 h-3.5" /> Rời phòng
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left: Pomodoro Timer & Member Presence (5 Cols) */}
              <div className="lg:col-span-5 space-y-6">
                {/* Pomodoro Focus Card */}
                <div className="p-6 bg-white dark:bg-[#0c0c0f] border border-slate-200/90 dark:border-slate-800 rounded-2xl text-center space-y-4 shadow-md">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 dark:bg-amber-950/60 rounded-full border border-amber-200 dark:border-amber-800 text-xs font-black text-amber-600 dark:text-amber-400 shadow-2xs">
                    <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    {timerMode === "FOCUS" ? "Chu Kỳ Tập Trung (25m)" : "Nghỉ Giải Lao (5m)"}
                  </div>

                  <div className="text-5xl sm:text-6xl font-black font-mono tracking-tight text-slate-900 dark:text-white select-none">
                    {formatTimer(timerSeconds)}
                  </div>

                  <div className="flex items-center justify-center gap-3 pt-2">
                    <button
                      onClick={() => setIsTimerRunning(!isTimerRunning)}
                      className="h-11 px-6 bg-[#0059bb] hover:bg-[#004ba0] text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      {isTimerRunning ? (
                        <>
                          <Pause className="w-4 h-4" /> Tạm dừng
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 fill-current" /> Bắt đầu tập trung
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => {
                        setIsTimerRunning(false);
                        setTimerSeconds(timerMode === "FOCUS" ? 25 * 60 : 5 * 60);
                      }}
                      className="h-11 px-3.5 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-all cursor-pointer shadow-2xs"
                      title="Đặt lại đồng hồ"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Members in Room */}
                <div className="p-5 bg-white dark:bg-[#0c0c0f] border border-slate-200/90 dark:border-slate-800 rounded-2xl space-y-4 shadow-md">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 font-display">
                      Thành viên trong phòng
                    </h3>
                    <span className="text-xs font-bold text-[#0059bb] dark:text-sky-400">
                      {activeRoom.members?.length || 1} học viên
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200/80 dark:border-slate-800">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-9 h-9 rounded-xl bg-[#0059bb] text-white flex items-center justify-center text-sm font-bold shrink-0 shadow-2xs">
                          {user?.avatarEmoji || "🦉"}
                        </div>
                        <div className="truncate min-w-0">
                          <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                            {user?.fullName || user?.username || "Bạn"} (Bạn)
                          </div>
                          <div className="text-[10px] text-emerald-500 font-bold flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Đang tập trung
                          </div>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/60 border border-amber-200 text-amber-600 text-[10px] font-black">
                        Host
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Live Chat & AI Mentor Box (7 Cols) */}
              <div className="lg:col-span-7 flex flex-col h-[560px] bg-white dark:bg-[#0c0c0f] border border-slate-200/90 dark:border-slate-800 rounded-2xl overflow-hidden shadow-md">
                {/* Chat Header */}
                <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-[#0059bb] dark:text-sky-400" />
                    <span className="text-xs font-black text-slate-900 dark:text-white">Trò Chuyện & AI Mentor</span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400">
                    Gõ <strong>@AI</strong> để hỏi gia sư trí tuệ nhân tạo
                  </span>
                </div>

                {/* Messages List */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {messages.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-2 text-slate-400">
                      <Bot className="w-8 h-8 text-blue-500/40" />
                      <p className="text-xs font-medium">Chưa có tin nhắn nào. Hãy gửi lời chào hoặc gõ <strong>@AI</strong> để học bài!</p>
                    </div>
                  ) : (
                    messages.map((m) => (
                      <div
                        key={m.id}
                        className={`flex flex-col ${m.user?.id === user?.id ? "items-end" : "items-start"}`}
                      >
                        <span className="text-[10px] font-bold text-slate-400 mb-1 px-1">
                          {m.isAi ? "🤖 Gemini AI Mentor" : m.user?.fullName || m.user?.username || "Thành viên"}
                        </span>
                        <div
                          className={`p-3.5 rounded-2xl text-xs max-w-[85%] leading-relaxed ${
                            m.isAi
                              ? "bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900/50 text-purple-900 dark:text-purple-200"
                              : m.user?.id === user?.id
                              ? "bg-[#0059bb] text-white rounded-br-xs"
                              : "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-xs"
                          }`}
                        >
                          {m.content}
                        </div>
                      </div>
                    ))
                  )}
                  <div ref={chatEndRef} />
                </div>

                {/* Chat Input Bar */}
                <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 bg-white dark:bg-[#0c0c0f]">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Gõ tin nhắn hoặc hỏi @AI giải thích từ vựng..."
                    className="flex-1 h-11 px-4 text-xs font-medium rounded-xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/40 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#0059bb] focus:ring-2 focus:ring-[#0059bb]/20 transition-all"
                  />
                  <button
                    type="submit"
                    disabled={!inputMessage.trim() || isSending}
                    className="h-11 px-5 bg-[#0059bb] hover:bg-[#004ba0] disabled:opacity-50 text-white rounded-xl cursor-pointer active:scale-95 transition-all shadow-xs flex items-center justify-center"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        ) : (
          /* ─── LOBBY VIEW (ROOM LIST) ─── */
          <div className="space-y-6">
            {/* Category Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCategory(c.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === c.id
                      ? "bg-[#0059bb] text-white shadow-xs"
                      : "bg-white dark:bg-[#0c0c0f] border border-slate-200/90 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {/* Room Cards Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-48 bg-white dark:bg-[#0c0c0f] border border-slate-200/90 dark:border-slate-800 rounded-2xl animate-pulse p-6 space-y-4">
                    <div className="h-5 w-24 bg-slate-200 dark:bg-slate-800 rounded-lg" />
                    <div className="h-6 w-3/4 bg-slate-200 dark:bg-slate-800 rounded-lg" />
                    <div className="h-4 w-full bg-slate-100 dark:bg-slate-800/60 rounded-md" />
                  </div>
                ))}
              </div>
            ) : filteredRooms.length === 0 ? (
              <div className="text-center py-16 bg-white dark:bg-[#0c0c0f] border border-slate-200/90 dark:border-slate-800 rounded-2xl p-8 space-y-4 shadow-md">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-[#0059bb] dark:text-sky-400 flex items-center justify-center mx-auto shadow-2xs">
                  <Users className="w-7 h-7" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Chưa có phòng học nào trong danh mục này</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Hãy là người đầu tiên tạo phòng học nhóm để cùng bạn bè bứt phá điểm số hôm nay!
                </p>
                <button
                  onClick={() => setIsCreateOpen(true)}
                  className="h-10 px-5 bg-[#0059bb] hover:bg-[#004ba0] text-white text-xs font-bold rounded-xl shadow-xs active:scale-95 cursor-pointer inline-flex items-center gap-1.5 transition-all"
                >
                  <Plus className="w-4 h-4" /> Tạo phòng ngay
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredRooms.map((r) => (
                  <div
                    key={r.id}
                    className="p-6 bg-white dark:bg-[#0c0c0f] border border-slate-200/90 dark:border-slate-800 rounded-2xl shadow-md hover:border-[#0059bb]/50 transition-all flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-start justify-between gap-2">
                        <span className="px-2.5 py-0.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800 text-[10px] font-black uppercase text-[#0059bb] dark:text-sky-400">
                          {r.category}
                        </span>
                        {r.isPrivate ? (
                          <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                            <Lock className="w-3 h-3 text-amber-500" /> Riêng tư
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-emerald-500 flex items-center gap-1">
                            <Globe className="w-3 h-3" /> Công khai
                          </span>
                        )}
                      </div>

                      <h3 className="text-base font-black text-slate-900 dark:text-white line-clamp-1 font-display">
                        {r.name}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                        {r.description || "Cùng nhau học tập trung và thảo luận tiếng Anh mỗi ngày."}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                        <Users className="w-3.5 h-3.5 text-slate-400" />
                        <span>{r._count?.members || r.members?.length || 1}/{r.maxMembers} thành viên</span>
                      </div>

                      <button
                        onClick={() => setActiveRoom(r)}
                        className="h-9 px-4 bg-[#0059bb] hover:bg-[#004ba0] text-white text-xs font-bold rounded-xl active:scale-95 cursor-pointer shadow-xs inline-flex items-center gap-1 transition-all"
                      >
                        Tham gia <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Create Room Modal */}
            <AnimatePresence>
              {isCreateOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="w-full max-w-md bg-white dark:bg-[#0c0c0f] border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 sm:p-7 shadow-2xl space-y-5"
                  >
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-black text-slate-900 dark:text-white font-display">
                        Tạo Phòng Học Nhóm Mới
                      </h2>
                      <button
                        onClick={() => setIsCreateOpen(false)}
                        className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <form onSubmit={handleCreateRoom} className="space-y-4 text-xs">
                      <div>
                        <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1.5 uppercase tracking-wider text-[11px]">
                          Tên phòng học *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="VD: Cày 200 từ vựng TOEIC 800+"
                          value={newRoomName}
                          onChange={(e) => setNewRoomName(e.target.value)}
                          className="w-full h-11 px-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 text-slate-900 dark:text-white font-medium focus:outline-none focus:border-[#0059bb] focus:ring-2 focus:ring-[#0059bb]/20 transition-all"
                        />
                      </div>

                      <div>
                        <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1.5 uppercase tracking-wider text-[11px]">
                          Danh mục học tập
                        </label>
                        <select
                          value={newRoomCategory}
                          onChange={(e) => setNewRoomCategory(e.target.value)}
                          className="w-full h-11 px-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 text-slate-900 dark:text-white font-bold focus:outline-none cursor-pointer"
                        >
                          <option value="TOEIC">TOEIC 4K</option>
                          <option value="IELTS">IELTS Academic</option>
                          <option value="SPEAKING">Luyện Nói AI</option>
                          <option value="VOCAB">Từ Vựng & Phản Xạ</option>
                        </select>
                      </div>

                      <div>
                        <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1.5 uppercase tracking-wider text-[11px]">
                          Mô tả phòng
                        </label>
                        <textarea
                          rows={2}
                          placeholder="Mục tiêu buổi học và nội quy phòng..."
                          value={newRoomDesc}
                          onChange={(e) => setNewRoomDesc(e.target.value)}
                          className="w-full p-3.5 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 text-slate-900 dark:text-white font-medium focus:outline-none focus:border-[#0059bb] focus:ring-2 focus:ring-[#0059bb]/20 transition-all resize-none"
                        />
                      </div>

                      <div className="flex items-center justify-end gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setIsCreateOpen(false)}
                          className="h-10 px-4 rounded-xl text-slate-600 dark:text-slate-400 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
                        >
                          Hủy
                        </button>
                        <button
                          type="submit"
                          className="h-10 px-5 bg-[#0059bb] hover:bg-[#004ba0] text-white font-bold rounded-xl active:scale-95 transition-all shadow-xs cursor-pointer"
                        >
                          Tạo phòng ngay
                        </button>
                      </div>
                    </form>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </div>
        )}
      </PageEntranceWrapper>
    </div>
  );
}
