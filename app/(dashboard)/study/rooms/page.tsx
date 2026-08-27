"use client";
import React, { useState, useEffect, useRef } from "react";
import { useAuthStore } from "@/lib/store/authStore";
import { useNotificationStore } from "@/lib/store/notificationStore";
import { useUiStore } from "@/lib/store/uiStore";
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
  Check
} from "lucide-react";
import { Button, Badge } from "@/components/ui";

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
    <div className="space-y-6 pb-20 font-sans antialiased" suppressHydrationWarning>
      {/* ─── WORKSPACE VIEW (IF IN A ROOM) ─── */}
      {activeRoom ? (
        <div className="space-y-6">
          {/* Top Bar of Active Room */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xs shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xs bg-blue-500/10 text-blue-600 dark:text-sky-400 flex items-center justify-center font-black">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-base sm:text-lg font-black text-slate-900 dark:text-white font-display">
                    {activeRoom.name}
                  </h1>
                  <Badge variant="neutral" className="text-[10px] font-black uppercase">
                    {activeRoom.category}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                  <span>Mã phòng: <strong className="font-mono text-slate-900 dark:text-white">{activeRoom.id}</strong></span>
                  <button
                    onClick={copyRoomCode}
                    className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                    title="Sao chép mã phòng"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>

            <Button
              variant="secondary"
              size="sm"
              onClick={() => setActiveRoom(null)}
              className="text-xs font-bold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 border-rose-200 dark:border-rose-900/40"
            >
              <LogOut className="w-3.5 h-3.5 mr-1.5" /> Rời phòng
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Pomodoro Timer & Member Presence (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Pomodoro Focus Card */}
              <div className="p-6 bg-gradient-to-br from-blue-500/10 via-indigo-500/5 to-transparent border border-blue-200/60 dark:border-blue-900/40 rounded-xs text-center space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/80 dark:bg-slate-900/80 rounded-full border border-slate-200/50 dark:border-slate-800 text-[11px] font-black text-blue-600 dark:text-sky-400 shadow-xs">
                  <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  {timerMode === "FOCUS" ? "Chu Kỳ Tập Trung (25m)" : "Nghỉ Giải Lao (5m)"}
                </div>

                <div className="text-5xl sm:text-6xl font-black font-mono tracking-tight text-slate-900 dark:text-white select-none">
                  {formatTimer(timerSeconds)}
                </div>

                <div className="flex items-center justify-center gap-3 pt-2">
                  <Button
                    onClick={() => setIsTimerRunning(!isTimerRunning)}
                    className="bg-[#0059bb] hover:bg-[#004ca0] text-white px-6 font-bold text-xs rounded-xs shadow-md cursor-pointer"
                  >
                    {isTimerRunning ? (
                      <>
                        <Pause className="w-4 h-4 mr-1.5" /> Tạm dừng
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-1.5 fill-current" /> Bắt đầu tập trung
                      </>
                    )}
                  </Button>

                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      setIsTimerRunning(false);
                      setTimerSeconds(timerMode === "FOCUS" ? 25 * 60 : 5 * 60);
                    }}
                    className="rounded-xs"
                    title="Đặt lại đồng hồ"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Members in Room */}
              <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 font-display">
                    Thành viên trong phòng
                  </h3>
                  <span className="text-xs font-bold text-blue-600 dark:text-sky-400">
                    {activeRoom.members?.length || 1} học viên
                  </span>
                </div>

                <div className="space-y-2.5">
                  <div className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-xs border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-full bg-[#0059bb] text-white flex items-center justify-center text-xs font-bold shrink-0">
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
                    <Badge variant="neutral" className="text-[9px] font-black text-amber-500">
                      Host
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Live Chat & AI Mentor Box (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col h-[560px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xs overflow-hidden shadow-sm">
              {/* Chat Header */}
              <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-blue-600 dark:text-sky-400" />
                  <span className="text-xs font-black text-slate-900 dark:text-white">Trò Chuyện & AI Mentor</span>
                </div>
                <span className="text-[10px] font-bold text-slate-400">
                  Gõ <strong>@AI</strong> để hỏi gia sư trí tuệ nhân tạo
                </span>
              </div>

              {/* Chat Messages Log */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3">
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex flex-col ${
                      m.isAi ? "items-start" : m.user?.id === user?.id ? "items-end" : "items-start"
                    }`}
                  >
                    <div className="text-[10px] font-bold text-slate-400 mb-1 flex items-center gap-1">
                      {m.isAi ? (
                        <>
                          <Bot className="w-3 h-3 text-purple-500" />
                          <span className="text-purple-600 dark:text-purple-400 font-black">AI Mentor</span>
                        </>
                      ) : (
                        <span>{m.user?.fullName || m.user?.username || "Thành viên"}</span>
                      )}
                    </div>

                    <div
                      className={`p-3 rounded-xs text-xs max-w-[85%] leading-relaxed ${
                        m.isAi
                          ? "bg-purple-50 dark:bg-purple-950/40 text-purple-900 dark:text-purple-200 border border-purple-200 dark:border-purple-800"
                          : m.user?.id === user?.id
                          ? "bg-[#0059bb] text-white rounded-br-none font-medium"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-none"
                      }`}
                    >
                      {m.content}
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>

              {/* Message Input Form */}
              <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-100 dark:border-slate-800 flex gap-2">
                <input
                  type="text"
                  placeholder="Nhập tin nhắn hoặc gõ @AI để hỏi đáp..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 text-xs font-semibold rounded-xs border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
                <Button
                  type="submit"
                  disabled={!inputMessage.trim() || isSending}
                  className="bg-[#0059bb] hover:bg-[#004ca0] text-white px-4 rounded-xs cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        /* ─── LOBBY VIEW (ROOM LIST) ─── */
        <div className="space-y-6">
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-display tracking-tight">
                Phòng Học Nhóm & Pomodoro
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 font-semibold">
                Rèn luyện kỷ luật, học tập theo chu kỳ Pomodoro và nhận hỗ trợ từ AI Mentor cùng học viên toàn quốc.
              </p>
            </div>

            <Button
              onClick={() => setIsCreateOpen(true)}
              className="bg-[#0059bb] hover:bg-[#004ca0] text-white font-bold text-xs rounded-xs shadow-md cursor-pointer"
            >
              <Plus className="w-4 h-4 mr-1.5" /> Tạo Phòng Mới
            </Button>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-3.5 py-2 rounded-xs text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === c.id
                    ? "bg-[#0059bb] text-white shadow-xs"
                    : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50"
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
                <div key={i} className="h-44 bg-slate-100 dark:bg-slate-800 rounded-xs animate-pulse" />
              ))}
            </div>
          ) : filteredRooms.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xs p-8 space-y-4">
              <div className="w-12 h-12 rounded-xs bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-sky-400 flex items-center justify-center mx-auto">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Chưa có phòng học nào trong danh mục này</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Hãy là người đầu tiên tạo phòng học nhóm để cùng bạn bè bứt phá điểm số hôm nay!
              </p>
              <Button onClick={() => setIsCreateOpen(true)} size="sm" className="rounded-xs">
                <Plus className="w-4 h-4 mr-1" /> Tạo phòng ngay
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredRooms.map((r) => (
                <div
                  key={r.id}
                  className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xs shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <Badge variant="neutral" className="text-[10px] font-black uppercase text-blue-600 dark:text-sky-400">
                        {r.category}
                      </Badge>
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

                    <h3 className="text-sm font-black text-slate-900 dark:text-white line-clamp-1 font-display">
                      {r.name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {r.description || "Cùng nhau học tập trung và thảo luận tiếng Anh mỗi ngày."}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                      <span>{r._count?.members || r.members?.length || 1}/{r.maxMembers}</span>
                    </div>

                    <Button
                      size="sm"
                      onClick={() => setActiveRoom(r)}
                      className="bg-[#0059bb] hover:bg-[#004ca0] text-white text-xs font-bold rounded-xs cursor-pointer"
                    >
                      Tham gia <ChevronRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
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
                  className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xs p-6 shadow-2xl space-y-5"
                >
                  <div className="flex items-center justify-between">
                    <h2 className="text-base font-black text-slate-900 dark:text-white font-display">
                      Tạo Phòng Học Nhóm Mới
                    </h2>
                    <button
                      onClick={() => setIsCreateOpen(false)}
                      className="text-slate-400 hover:text-slate-600 text-sm font-bold cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>

                  <form onSubmit={handleCreateRoom} className="space-y-4 text-xs">
                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                        Tên phòng học *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="VD: Cày 200 từ vựng TOEIC 800+"
                        value={newRoomName}
                        onChange={(e) => setNewRoomName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xs border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                        Danh mục học tập
                      </label>
                      <select
                        value={newRoomCategory}
                        onChange={(e) => setNewRoomCategory(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xs border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold focus:outline-none cursor-pointer"
                      >
                        <option value="TOEIC">TOEIC 4K</option>
                        <option value="IELTS">IELTS Academic</option>
                        <option value="SPEAKING">Luyện Nói AI</option>
                        <option value="VOCAB">Từ Vựng & Phản Xạ</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                        Mô tả phòng
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Mục tiêu buổi học và nội quy phòng..."
                        value={newRoomDesc}
                        onChange={(e) => setNewRoomDesc(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xs border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:outline-none resize-none"
                      />
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-2">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsCreateOpen(false)}
                      >
                        Hủy
                      </Button>
                      <Button
                        type="submit"
                        size="sm"
                        className="bg-[#0059bb] hover:bg-[#004ca0] text-white font-bold rounded-xs"
                      >
                        Tạo phòng
                      </Button>
                    </div>
                  </form>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
