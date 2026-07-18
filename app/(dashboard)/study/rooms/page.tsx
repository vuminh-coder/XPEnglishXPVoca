"use client";
import React, { useState, useEffect, useRef } from "react";
import { Card, Button, Badge } from "@/components/ui";
import { useAuthStore } from "@/lib/store/authStore";
import { useNotificationStore } from "@/lib/store/notificationStore";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Send,
  ArrowRight,
  Sparkles,
  Plus,
  Lock,
  Flame,
  Clock,
  Bot,
  CheckCircle2,
  XCircle,
  Search,
  Gamepad2,
  Copy,
  Check,
  ShieldAlert,
  Sliders,
  Play,
  Pause,
} from "lucide-react";

import { getRoom100Questions, RoomQuizQuestion } from "@/lib/data/roomQuizBank";
import { SpeedMatchGame } from "@/components/study/SpeedMatchGame";
import { useVoiceChannel } from "@/hooks/useVoiceChannel";
import { VoiceControlPanel } from "@/components/study/VoiceControlPanel";
import { WebRTCManager } from "@/lib/webrtc/webrtcManager";

interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  level: string;
  xp: number;
  team?: string;
}

interface Message {
  id: string;
  user?: UserProfile;
  text: string;
  time: string;
  isSystem?: boolean;
  isAi?: boolean;
}

interface Room {
  id: string;
  name: string;
  description: string;
  category: string;
  accentColor: string;
  maxMembers: number;
  isPrivate: boolean;
  onlineCount: number;
  createdById: string;
}

const listContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
} as const;

const cardItemVariants = {
  hidden: { opacity: 0, y: 15, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 85,
      damping: 15,
    },
  },
} as const;

const TEAMS_LIST = ["Tổ 1", "Tổ 2", "Tổ 3", "Tổ 4", "Tổ 5"];

export default function GroupRoomsPage() {
  const { user, awardXp } = useAuthStore();
  const { addToast } = useNotificationStore();

  const [rooms, setRooms] = useState<Room[]>([]);
  const [loadingRooms, setLoadingRooms] = useState(true);
  const [activeRoom, setActiveRoom] = useState<Room | null>(null);

  // Quick Join Search State
  const [quickJoinId, setQuickJoinId] = useState("");
  const [copiedLink, setCopiedLink] = useState(false);

  // Messages & Members State
  const [messages, setMessages] = useState<Message[]>([]);
  const [members, setMembers] = useState<UserProfile[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [sendingMsg, setSendingMsg] = useState(false);
  const [isChatHidden, setIsChatHidden] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const prevMessagesCountRef = useRef(0);
  // My Selected Team
  const [myTeam, setMyTeam] = useState<string>("Tổ 1");
  // Team Level Balancing
  const balanceMembersIntoTeams = (rawMembers: UserProfile[]) => {
    const sorted = [...rawMembers].sort((a, b) => b.xp - a.xp);
    return sorted.map((m, idx) => ({
      ...m,
      team: TEAMS_LIST[idx % TEAMS_LIST.length],
      correctAnswers: Math.floor((m.xp / 10) * 0.85) + 12,
      accuracyRate: Math.min(98, 70 + (idx % 25)),
      streakCount: (idx % 7) + 3,
    }));
  };

  // Member Inspection Modal State
  const [selectedMemberModal, setSelectedMemberModal] = useState<any | null>(null);
  const [showMembersModal, setShowMembersModal] = useState(false);
  const [selectedTeamTab, setSelectedTeamTab] = useState<string>("MY_TEAM"); // "MY_TEAM" | "OPPONENT_TEAM"
  const [opponentTeam, setOpponentTeam] = useState<string>("Tổ 2");
  const [isJoinedTeam, setIsJoinedTeam] = useState<boolean>(false);
  const [showMemberList, setShowMemberList] = useState(false);

  // Real WebAudio Voice Hook
  const voiceChannel = useVoiceChannel({
    roomId: activeRoom?.id,
  });

  const webrtcRef = useRef<WebRTCManager | null>(null);

  // Initialize WebRTC signaling when connected to Voice Channel
  useEffect(() => {
    if (voiceChannel.isConnected && activeRoom && user?.id) {
      const manager = new WebRTCManager({
        roomId: activeRoom.id,
        userId: user.id,
        onRemoteTrack: (peerId, stream) => {
          // Play remote audio stream dynamically
          const audio = new Audio();
          audio.srcObject = stream;
          audio.play().catch(() => {});
        },
      });
      if (voiceChannel.localStream) {
        manager.setLocalStream(voiceChannel.localStream);
      }
      manager.startSignalPolling();
      webrtcRef.current = manager;
    } else {
      if (webrtcRef.current) {
        webrtcRef.current.closeAll();
        webrtcRef.current = null;
      }
    }
  }, [voiceChannel.isConnected, activeRoom, user?.id, voiceChannel.localStream]);

  // Room View Active Tab: "chat" | "arena" | "speed_game"
  const [activeTab, setActiveTab] = useState<"chat" | "arena" | "speed_game">("chat");

  // Pomodoro & Custom Duration State (15m, 25m, 45m, 60m, custom)
  const [timerMinutes, setTimerMinutes] = useState(25);
  const [pomodoroSeconds, setPomodoroSeconds] = useState(25 * 60);
  const [isTimerPaused, setIsTimerPaused] = useState(false);
  const [pomodoroMode, setPomodoroMode] = useState<"FOCUS" | "BREAK">("FOCUS");
  const [showTimerSettings, setShowTimerSettings] = useState(false);

  // Quiz State (100 Questions Test Bank)
  const [quizActive, setQuizActive] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState<RoomQuizQuestion[]>([]);
  const [quizStep, setQuizStep] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  // Modal Create Room State
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newRoomName, setNewRoomName] = useState("");
  const [newRoomDesc, setNewRoomDesc] = useState("");
  const [newRoomCategory, setNewRoomCategory] = useState("TOEIC");
  const [newRoomPrivate, setNewRoomPrivate] = useState(false);
  const [newRoomPasscode, setNewRoomPasscode] = useState("");
  const [creatingRoom, setCreatingRoom] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const vocabPool = useRef<any[]>([]);

  // Fetch Vocab Pool for Speed Match Game
  useEffect(() => {
    fetch("/api/vocabulary?limit=100&random=true")
      .then((res) => res.json())
      .then((res) => {
        if (res.success && res.data) {
          vocabPool.current = res.data;
        }
      })
      .catch((err) => console.error(err));
  }, []);

  // 1. Fetch all rooms
  const fetchRooms = async () => {
    try {
      setLoadingRooms(true);
      const res = await fetch("/api/study-rooms");
      const data = await res.json();
      if (data.success && Array.isArray(data.rooms)) {
        const formatted = data.rooms.map((r: any) => ({
          id: r.id.length > 6 ? r.id.slice(0, 6) : r.id,
          name: r.name,
          description: r.description,
          category: r.category,
          accentColor: r.accentColor,
          maxMembers: r.maxMembers,
          isPrivate: r.isPrivate,
          onlineCount: r._count?.members || 1,
          createdById: r.createdById,
        }));
        setRooms(formatted);
      }
    } catch (err) {
      console.error("Fetch rooms error:", err);
    } finally {
      setLoadingRooms(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  // 2. Poll messages when inside an active room
  useEffect(() => {
    if (!activeRoom) return;

    const fetchRoomData = async () => {
      try {
        // Fetch messages
        const resMsg = await fetch(`/api/study-rooms/${activeRoom.id}/messages`);
        const dataMsg = await resMsg.json();
        if (dataMsg.success && Array.isArray(dataMsg.messages)) {
          const formattedMsg: Message[] = dataMsg.messages.map((m: any) => ({
            id: m.id,
            user: m.user
              ? {
                  id: m.user.id,
                  name: m.user.fullName || m.user.username || "Học viên",
                  avatar: m.user.id === user?.id ? (user?.avatarEmoji || m.user.avatarEmoji || "🦉") : (m.user.avatarEmoji || "🎓"),
                  level: m.user.title || "Intermediate",
                  xp: m.user.totalXp || 100,
                  team: "Tổ " + ((Math.abs(m.user.id.charCodeAt(0) || 1) % 5) + 1),
                }
              : undefined,
            text: m.content,
            time: new Date(m.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            isSystem: m.isSystem,
            isAi: m.isAi,
          }));
          setMessages(formattedMsg);
        }

        // Fetch real-time members from DB
        const resMem = await fetch(`/api/study-rooms/${activeRoom.id}/members`);
        const dataMem = await resMem.json();
        if (dataMem.success && Array.isArray(dataMem.members)) {
          const dbMembers: UserProfile[] = dataMem.members.map((m: any, idx: number) => ({
            id: m.user.id,
            name: m.user.fullName || m.user.username || `Học viên ${idx + 1}`,
            avatar: m.user.avatarEmoji || "🎓",
            level: m.user.title || "Intermediate",
            xp: m.user.totalXp || 1200,
            team: TEAMS_LIST[idx % TEAMS_LIST.length],
          }));

          // Always append AI Mentor & bot bots if needed
          const fullList = [
            ...dbMembers,
            { id: "ai_bot", name: "AI Mentor", avatar: "🤖", level: "AI Tutor", xp: 9999, team: "Tổ 1" },
          ];

          setMembers(balanceMembersIntoTeams(fullList));
        }
      } catch (err) {
        console.error("Fetch room data error:", err);
      }
    };

    fetchRoomData();
    const interval = setInterval(fetchRoomData, 2000);
    return () => clearInterval(interval);
  }, [activeRoom]);

  // Scroll to bottom on new message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Reset message tracking when entering a room or toggling chat visibility
  useEffect(() => {
    prevMessagesCountRef.current = messages.length;
    if (!isChatHidden) {
      setUnreadCount(0);
    }
  }, [activeRoom, isChatHidden]);

  // Track unread messages when chat is hidden and trigger a Toast notification
  useEffect(() => {
    if (isChatHidden) {
      const diff = messages.length - prevMessagesCountRef.current;
      if (diff > 0) {
        setUnreadCount((c) => c + diff);
        // Get the latest message content for notification
        const latestMsg = messages[messages.length - 1];
        if (latestMsg && !latestMsg.isSystem) {
          const senderName = latestMsg.user?.name || (latestMsg.isAi ? "AI Mentor" : "Học viên");
          addToast({
            type: "xp", // elegant orange/amber highlight toast
            title: `Tin nhắn mới từ ${senderName} 💬`,
            message: latestMsg.text.length > 40 ? latestMsg.text.slice(0, 40) + "..." : latestMsg.text,
          });
        }
      }
    }
    prevMessagesCountRef.current = messages.length;
  }, [messages, isChatHidden, addToast]);

  // Timer countdown logic
  useEffect(() => {
    if (!activeRoom || isTimerPaused) return;
    const timer = setInterval(() => {
      setPomodoroSeconds((prev) => {
        if (prev <= 1) {
          if (pomodoroMode === "FOCUS") {
            setPomodoroMode("BREAK");
            awardXp(50);
            addToast({
              type: "xp",
              title: "+50 XP Tập Trung Nhóm! 🏆",
              message: `Đã hoàn thành ${timerMinutes} phút tập trung cùng các Tổ!`,
            });
            return 5 * 60; // 5 mins break
          } else {
            setPomodoroMode("FOCUS");
            return timerMinutes * 60;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [activeRoom, isTimerPaused, pomodoroMode, timerMinutes, awardXp, addToast]);

  // Set custom timer minutes
  const changeTimerDuration = (mins: number) => {
    setTimerMinutes(mins);
    setPomodoroSeconds(mins * 60);
    setIsTimerPaused(false);
    setShowTimerSettings(false);
    addToast({
      type: "xp",
      title: "Đã cập nhật thời lượng!",
      message: `Thời gian tập trung đã đặt thành ${mins} phút.`,
    });
  };

  // Join Room
  const joinRoom = async (room: Room) => {
    setActiveRoom(room);
    setQuizActive(false);
    setActiveTab("chat");
    setQuizStep(0);
    setQuizScore(0);
    setSelectedAnswer(null);

    try {
      await fetch(`/api/study-rooms/${room.id}/members`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "join", status: "FOCUSING" }),
      });
    } catch (err) {
      console.error("Join room error:", err);
    }

    const rawList: UserProfile[] = [
      { id: user?.id || "me", name: user?.username || "Bạn", avatar: user?.avatarEmoji || "🦉", level: "Pro", xp: user?.totalXp || 1200 },
      { id: "ai_bot", name: "AI Mentor", avatar: "🤖", level: "AI Tutor", xp: 9999 },
      { id: "mem_2", name: "Jenny Tran", avatar: "👩‍🎨", level: "Advanced", xp: 3400 },
      { id: "mem_3", name: "Alex Pham", avatar: "👨‍🚀", level: "Intermediate", xp: 1980 },
      { id: "mem_4", name: "Sophie Le", avatar: "👩‍⚕️", level: "Advanced", xp: 2800 },
      { id: "mem_5", name: "Minh Vu", avatar: "👨‍💻", level: "Beginner", xp: 850 },
      { id: "mem_6", name: "David Nguyen", avatar: "👨‍✈️", level: "Master", xp: 4200 },
      { id: "mem_7", name: "Elena Rostova", avatar: "👩‍🚀", level: "Pro", xp: 2150 },
    ];

    setMembers(balanceMembersIntoTeams(rawList));
  };

  // Quick Join by ID input
  const handleQuickJoin = () => {
    if (!quickJoinId.trim()) return;
    const found = rooms.find((r) => r.id === quickJoinId.trim() || r.name.toLowerCase().includes(quickJoinId.toLowerCase()));
    if (found) {
      joinRoom(found);
      setQuickJoinId("");
    } else {
      addToast({
        type: "xp",
        title: "Không tìm thấy phòng!",
        message: "Hãy kiểm tra lại Mã ID phòng học.",
      });
    }
  };

  // Copy share link
  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  // Leave Room
  const leaveRoom = async () => {
    if (!activeRoom) return;
    try {
      await fetch(`/api/study-rooms/${activeRoom.id}/members`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "leave" }),
      });
    } catch (err) {
      console.error("Leave room error:", err);
    }
    setActiveRoom(null);
  };

  // Send Message
  const sendMessage = async () => {
    if (!inputValue.trim() || !activeRoom || sendingMsg) return;

    const textToSend = `[${myTeam}] ${inputValue}`;
    setInputValue("");
    setSendingMsg(true);

    try {
      const res = await fetch(`/api/study-rooms/${activeRoom.id}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: textToSend }),
      });
      const data = await res.json();

      if (data.success && data.message) {
        const newMsg: Message = {
          id: data.message.id,
          user: {
            id: user?.id || "me",
            name: user?.username || "Bạn",
            avatar: user?.avatarEmoji || "🦉",
            level: "Pro",
            xp: user?.totalXp || 1000,
            team: myTeam,
          },
          text: data.message.content,
          time: "Vừa xong",
        };
        setMessages((prev) => [...prev, newMsg]);

        if (data.aiMessage) {
          const aiMsg: Message = {
            id: data.aiMessage.id,
            text: data.aiMessage.content,
            time: "Vừa xong",
            isAi: true,
          };
          setMessages((prev) => [...prev, aiMsg]);
        }
      }
    } catch (err) {
      console.error("Send message error:", err);
    } finally {
      setSendingMsg(false);
    }
  };

  // Create Room
  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoomName.trim() || creatingRoom) return;

    try {
      setCreatingRoom(true);
      const res = await fetch("/api/study-rooms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newRoomName,
          description: newRoomDesc,
          category: newRoomCategory,
          isPrivate: newRoomPrivate,
          passcode: newRoomPrivate ? newRoomPasscode : undefined,
        }),
      });

      const data = await res.json();
      if (data.success && data.room) {
        addToast({
          type: "xp",
          title: "Đã tạo phòng học!",
          message: `Phòng ${data.room.name} đã sẵn sàng!`,
        });
        setShowCreateModal(false);
        setNewRoomName("");
        setNewRoomDesc("");
        fetchRooms();
        joinRoom({
          id: data.room.id,
          name: data.room.name,
          description: data.room.description,
          category: data.room.category,
          accentColor: data.room.accentColor,
          maxMembers: data.room.maxMembers,
          isPrivate: data.room.isPrivate,
          onlineCount: 1,
          createdById: data.room.createdById,
        });
      }
    } catch (err) {
      console.error("Create room error:", err);
    } finally {
      setCreatingRoom(false);
    }
  };

  // Quiz Session 100 Questions
  const startQuizSession = () => {
    const q100 = getRoom100Questions(activeRoom?.category);
    setQuizQuestions(q100);
    setQuizStep(0);
    setQuizScore(0);
    setSelectedAnswer(null);
    setQuizActive(true);
  };

  const answerQuiz = (index: number) => {
    if (quizQuestions.length === 0) return;
    setSelectedAnswer(index);
    const currentQ = quizQuestions[quizStep];
    const correct = index === currentQ.correct;
    if (correct) {
      setQuizScore((s) => s + 1);
    }

    setTimeout(() => {
      if (quizStep < quizQuestions.length - 1) {
        setQuizStep((s) => s + 1);
        setSelectedAnswer(null);
      } else {
        setQuizActive(false);
        const earnedXp = (quizScore + (correct ? 1 : 0)) * 10 + 20;
        awardXp(earnedXp);
        addToast({
          type: "xp",
          title: `+${earnedXp} XP 🌟`,
          message: `Thực chiến 100 Test cho ${myTeam} hoàn tất! Kết quả: ${quizScore + (correct ? 1 : 0)}/${quizQuestions.length}`,
        });
      }
    }, 1200);
  };

  const formatPomodoroTime = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Main List View
  if (!activeRoom) {
    return (
      <div className="max-w-5xl mx-auto space-y-6 pb-20 md:pb-6" suppressHydrationWarning>
        {/* Double-Bezel Hardware Shell Header Banner - Modern Compact 1.5rem Radius */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 85, damping: 15 }}
          className="p-1 rounded-[1.5rem] bg-gradient-to-br from-amber-400/20 via-blue-600/30 to-indigo-700/30 border border-amber-300/40 dark:border-blue-500/20 shadow-lg"
        >
          <div className="p-5 md:p-6 rounded-[calc(1.5rem-0.25rem)] bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xl border border-white/50 dark:border-white/10 flex flex-col xl:flex-row xl:items-center justify-between gap-5">
            <div className="space-y-1.5 max-w-xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-400/30">
                <Sparkles className="h-3 w-3 fill-amber-400 animate-spin" style={{ animationDuration: "12s" }} /> Arena Live 4.0
              </span>
              <h1 className="text-xl md:text-2xl font-black tracking-tight text-slate-900 dark:text-white font-display leading-tight">
                Phòng Học Nhóm <br />
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-amber-500 bg-clip-text text-transparent">Đấu Trường Kiến Thức</span>
              </h1>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-semibold leading-relaxed">
                Nhập Mã ID 6 số, phân Tổ cân bằng cấp độ (Tổ 1 - Tổ 5),Voice / Chat nhóm realtime và đọ sức 100 Test đố từ vựng!
              </p>
            </div>

            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 shrink-0">
              {/* Quick Join by 6-digit ID Input */}
              <div className="flex items-center gap-1.5 p-1 bg-slate-100/90 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 rounded-xl shadow-inner">
                <Search className="h-3.5 w-3.5 ml-2 text-blue-600 dark:text-blue-400 shrink-0" />
                <input
                  type="text"
                  maxLength={6}
                  placeholder="Mã ID 6 số..."
                  value={quickJoinId}
                  onChange={(e) => setQuickJoinId(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleQuickJoin()}
                  className="py-1 px-1.5 text-xs font-mono font-black tracking-wider bg-transparent focus:outline-none text-slate-900 dark:text-white w-24 uppercase"
                />
                <Button variant="primary" size="sm" className="rounded-lg text-xs font-black bg-blue-600 hover:bg-blue-700 text-white shrink-0 px-3 py-1.5 shadow-xs" onClick={handleQuickJoin}>
                  Vào ngay
                </Button>
              </div>

              <Button
                variant="primary"
                size="md"
                className="rounded-xl font-black text-xs text-white bg-gradient-to-r from-amber-500 via-blue-600 to-indigo-600 hover:opacity-95 shadow-glow cursor-pointer px-4 py-2.5 shrink-0"
                onClick={() => setShowCreateModal(true)}
              >
                <Plus className="h-4 w-4 mr-1" /> Tạo phòng
              </Button>
            </div>
          </div>
        </motion.div>

        {loadingRooms ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-[190px] rounded-2xl bg-slate-100 dark:bg-neutral-850 animate-pulse" />
            ))}
          </div>
        ) : (
          <motion.div
            variants={listContainerVariants}
            initial="hidden"
            animate="show"
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {rooms.map((room) => (
              <motion.div
                variants={cardItemVariants}
                whileHover={{ translateY: -3 }}
                whileTap={{ scale: 0.98 }}
                key={room.id}
                className="cursor-pointer"
              >
                <div className="p-0.5 rounded-[1.25rem] bg-gradient-to-b from-slate-200/60 to-slate-200/20 dark:from-neutral-800/80 dark:to-neutral-850/40 border border-slate-200 dark:border-neutral-800 shadow-sm hover:border-blue-500/50 transition-all">
                  <Card variant="bezel" className="p-4 flex flex-col justify-between h-[195px] bg-white dark:bg-neutral-900 rounded-[calc(1.25rem-0.125rem)] border-none relative overflow-hidden group">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2 py-0.5 rounded-md bg-blue-600 text-white text-[9px] font-black tracking-wide uppercase shadow-xs">
                          {room.category}
                        </span>
                        <div className="flex items-center gap-1.5">
                          {room.isPrivate && <Lock className="h-3 w-3 text-amber-500" />}
                          <span className="text-[9px] text-slate-500 font-extrabold flex items-center gap-1 uppercase">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            {room.onlineCount} online
                          </span>
                        </div>
                      </div>
                      <h3 className="text-xs md:text-sm font-black text-slate-900 dark:text-white font-display line-clamp-1">
                        {room.name}
                      </h3>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed font-semibold">
                        {room.description || "Nhóm ôn tập từ vựng, thách đấu kiến thức và hỗ trợ giải bài tập."}
                      </p>
                      <div className="mt-2 inline-flex items-center gap-1 text-[9px] font-mono font-black text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded-md border border-blue-200/40">
                        🔑 ID: {room.id}
                      </div>
                    </div>

                    <Button variant="primary" size="sm" className="w-full justify-center mt-2 cursor-pointer text-xs font-black text-white bg-blue-600 hover:bg-blue-700 rounded-lg py-1.5" onClick={() => joinRoom(room)}>
                      Tham gia phòng <ArrowRight className="h-3.5 w-3.5 ml-1 shrink-0" />
                    </Button>
                  </Card>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Modal Create Room */}
        <AnimatePresence>
          {showCreateModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4"
              >
                <div className="flex items-center justify-between border-b pb-3 border-slate-100 dark:border-neutral-800">
                  <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                    <Users className="h-5 w-5 text-indigo-500" /> Tạo Phòng Học Mới
                  </h3>
                  <button className="text-slate-400 hover:text-slate-600 dark:hover:text-white" onClick={() => setShowCreateModal(false)}>✕</button>
                </div>

                <form onSubmit={handleCreateRoom} className="space-y-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1">Tên phòng học</label>
                    <input
                      type="text"
                      required
                      placeholder="VD: TOEIC 800+ Tập Trung Học"
                      value={newRoomName}
                      onChange={(e) => setNewRoomName(e.target.value)}
                      className="w-full py-2 px-3 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 focus:outline-none focus:border-indigo-500 text-slate-800 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1">Mô tả phòng</label>
                    <textarea
                      placeholder="Mục tiêu bài học, thời gian tập trung..."
                      value={newRoomDesc}
                      onChange={(e) => setNewRoomDesc(e.target.value)}
                      className="w-full py-2 px-3 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 focus:outline-none focus:border-indigo-500 text-slate-800 dark:text-white h-20"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1">Chủ đề / Danh mục</label>
                      <select
                        value={newRoomCategory}
                        onChange={(e) => setNewRoomCategory(e.target.value)}
                        className="w-full py-2 px-3 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 focus:outline-none focus:border-indigo-500 text-slate-800 dark:text-white"
                      >
                        <option value="TOEIC">TOEIC</option>
                        <option value="IELTS">IELTS</option>
                        <option value="Giao tiếp">Giao tiếp</option>
                        <option value="Tổng quát">Tổng quát</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-2 pt-5">
                      <input
                        type="checkbox"
                        id="isPrivate"
                        checked={newRoomPrivate}
                        onChange={(e) => setNewRoomPrivate(e.target.checked)}
                        className="w-4 h-4 text-indigo-600 rounded"
                      />
                      <label htmlFor="isPrivate" className="text-xs font-bold text-slate-700 dark:text-slate-300">Phòng riêng tư</label>
                    </div>
                  </div>

                  {newRoomPrivate && (
                    <div>
                      <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1">Mật khẩu phòng PIN</label>
                      <input
                        type="password"
                        placeholder="VD: 1234"
                        value={newRoomPasscode}
                        onChange={(e) => setNewRoomPasscode(e.target.value)}
                        className="w-full py-2 px-3 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 focus:outline-none focus:border-indigo-500 text-slate-800 dark:text-white"
                      />
                    </div>
                  )}

                  <div className="pt-2 flex gap-2">
                    <Button variant="ghost" size="sm" className="flex-1" type="button" onClick={() => setShowCreateModal(false)}>Hủy</Button>
                    <Button variant="primary" size="sm" className="flex-1 text-white bg-blue-600" type="submit" disabled={creatingRoom}>
                      {creatingRoom ? "Đang tạo..." : "Tạo phòng"}
                    </Button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Active Room View
  return (
    <div className="max-w-5xl mx-auto h-[calc(100dvh-220px)] md:h-[calc(100dvh-140px)] pb-0 md:pb-6" suppressHydrationWarning>
      {/* Main chat & Arena column */}
      <Card variant="bezel" className="w-full flex flex-col h-full overflow-hidden p-0 border-slate-200/40 dark:border-neutral-850 bg-white dark:bg-neutral-900 rounded-[calc(var(--radius-3xl)-6px)]">
        {/* Room Header with Custom Timer Selector & Share ID */}
        <div className="p-3 md:p-3.5 border-b border-slate-100 dark:border-neutral-850 flex flex-col gap-2.5 bg-slate-50/50 dark:bg-neutral-950">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xs md:text-sm font-black text-slate-900 dark:text-white flex items-center gap-1.5 font-display">
                {activeRoom.name}
              </h2>
              <button
                onClick={handleCopyLink}
                className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 py-0.5 px-2 rounded-md border border-indigo-200/50 dark:border-indigo-800/40 flex items-center gap-1 hover:bg-indigo-100"
              >
                {copiedLink ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                ID: {activeRoom.id.slice(0, 8)}
              </button>
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{activeRoom.description}</p>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            {/* Custom Timer Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowTimerSettings(!showTimerSettings)}
                className="flex items-center gap-1.5 py-1 px-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700/50 text-amber-700 dark:text-amber-300 font-mono text-[11px] font-black cursor-pointer hover:bg-amber-100 shadow-xs"
              >
                <Clock className="h-3.5 w-3.5 text-amber-500 animate-spin" style={{ animationDuration: "10s" }} />
                <span>{formatPomodoroTime(pomodoroSeconds)}</span>
                <Sliders className="h-3 w-3 ml-0.5" />
              </button>

              {/* Timer Settings Dropdown */}
              {showTimerSettings && (
                <div className="absolute right-0 top-10 z-30 w-48 p-3 bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-2xl shadow-xl space-y-2">
                  <p className="text-[10px] font-black text-slate-400 uppercase">Chọn thời lượng tập trung</p>
                  <div className="grid grid-cols-2 gap-1.5">
                    {[15, 25, 45, 60].map((m) => (
                      <button
                        key={m}
                        onClick={() => changeTimerDuration(m)}
                        className={`py-1.5 text-xs font-extrabold rounded-lg border transition-all ${
                          timerMinutes === m
                            ? "bg-amber-500 text-white border-amber-500"
                            : "bg-slate-50 dark:bg-neutral-950 border-slate-200 dark:border-neutral-800 text-slate-700 dark:text-slate-300"
                        }`}
                      >
                        {m} phút
                      </button>
                    ))}
                  </div>

                  <div className="pt-1 flex items-center gap-1">
                    <button
                      onClick={() => setIsTimerPaused(!isTimerPaused)}
                      className="flex-1 py-1 px-2 text-[10px] font-bold rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300 border border-indigo-200 flex items-center justify-center gap-1"
                    >
                      {isTimerPaused ? <Play className="h-3 w-3" /> : <Pause className="h-3 w-3" />}
                      {isTimerPaused ? "Tiếp tục" : "Tạm dừng"}
                    </button>
                  </div>
                </div>
              )}
            </div>

            <Button
              variant="secondary"
              size="sm"
              className="rounded-xl font-bold cursor-pointer text-xs bg-blue-50 dark:bg-blue-950/40 border border-blue-300 dark:border-blue-700/50 text-blue-700 dark:text-blue-300 hover:bg-blue-100 flex items-center gap-1"
              onClick={() => setShowMembersModal(true)}
            >
              <Users className="h-3.5 w-3.5 text-blue-600" />
              <span className="hidden sm:inline">Thành Viên</span> ({members.length})
            </Button>

            <VoiceControlPanel
              isConnected={voiceChannel.isConnected}
              isMuted={voiceChannel.isMuted}
              isDeaf={voiceChannel.isDeaf}
              isSpeaking={voiceChannel.isSpeaking}
              volumeLevel={voiceChannel.volumeLevel}
              isPushToTalk={voiceChannel.isPushToTalk}
              isPttActive={voiceChannel.isPttActive}
              noiseGateThreshold={voiceChannel.noiseGateThreshold}
              setNoiseGateThreshold={voiceChannel.setNoiseGateThreshold}
              setIsPushToTalk={voiceChannel.setIsPushToTalk}
              inputDevices={voiceChannel.inputDevices}
              outputDevices={voiceChannel.outputDevices}
              selectedInputId={voiceChannel.selectedInputId}
              selectedOutputId={voiceChannel.selectedOutputId}
              setSelectedInputId={voiceChannel.setSelectedInputId}
              setSelectedOutputId={voiceChannel.setSelectedOutputId}
              onConnect={async () => {
                try {
                  await voiceChannel.connectVoice();
                  addToast({
                    type: "xp",
                    title: "Đã bật Kênh Thoại Nhóm 🎙️",
                    message: "Kết nối âm thanh phòng thành công!",
                  });
                } catch (err) {
                  addToast({
                    type: "error",
                    title: "Lỗi Micro",
                    message: voiceChannel.errorMsg || "Quyền truy cập Micro bị từ chối!",
                  });
                }
              }}
              onDisconnect={() => {
                voiceChannel.disconnectVoice();
                addToast({
                  type: "xp",
                  title: "Đã tắt Kênh Thoại 🔇",
                  message: "Bạn đã rời kênh trò chuyện giọng nói.",
                });
              }}
              onToggleMute={voiceChannel.toggleMute}
              onToggleDeaf={voiceChannel.toggleDeaf}
            />

            <Button
              variant="secondary"
              size="sm"
              className="rounded-xl font-bold cursor-pointer text-xs bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700/50 text-amber-700 dark:text-amber-300 hover:bg-amber-100 flex items-center gap-1"
              onClick={startQuizSession}
              disabled={quizActive}
            >
              <Sparkles className="h-3.5 w-3.5 text-amber-500 fill-amber-400 animate-pulse" />
              <span className="hidden sm:inline">100 Test</span>
              <span className="sm:hidden">Test</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="text-xs font-bold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 cursor-pointer rounded-xl"
              onClick={leaveRoom}
            >
              <span className="hidden sm:inline">Rời phòng</span>
              <span className="sm:hidden">Rời</span>
            </Button>
          </div>
        </div>

        {/* Tab Switcher: Chat Feed vs Speed Match Game */}
        <div className="px-3 md:px-4 py-2 border-b border-slate-100 dark:border-neutral-850 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-slate-50/30 dark:bg-neutral-950">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("chat")}
              className={`py-1 px-3 text-xs font-extrabold rounded-xl transition-all ${
                activeTab === "chat"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "text-slate-500 hover:text-slate-800 dark:hover:text-white"
              }`}
            >
              💬 Trò chuyện & AI
            </button>
            <button
              onClick={() => setActiveTab("speed_game")}
              className={`py-1 px-3 text-xs font-extrabold rounded-xl transition-all flex items-center gap-1 ${
                activeTab === "speed_game"
                  ? "bg-amber-500 text-white shadow-xs"
                  : "text-slate-500 hover:text-slate-800 dark:hover:text-white"
              }`}
            >
              <Gamepad2 className="h-3.5 w-3.5" /> ⚡ Game Nối Từ
            </button>
            {activeTab === "chat" && (
              <button
                onClick={() => {
                  if (isChatHidden) {
                    setIsChatHidden(false);
                    setUnreadCount(0);
                  } else {
                    setIsChatHidden(true);
                  }
                }}
                className={`py-1 px-3 text-xs font-extrabold rounded-xl transition-all flex items-center gap-1 border border-slate-200 dark:border-neutral-800/80 hover:bg-slate-100 dark:hover:bg-neutral-850/60 cursor-pointer ${
                  isChatHidden
                    ? "bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-900/40"
                    : "text-slate-500 hover:text-slate-800 dark:hover:text-white"
                }`}
              >
                {isChatHidden ? "👁️ Hiện chat" : "👁️ Ẩn chat"}
                {isChatHidden && unreadCount > 0 && (
                  <span className="ml-1 bg-red-500 text-white text-[9px] px-1.5 py-0.5 rounded-full font-black animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>
            )}
          </div>

          {/* Select & Join Team Controls */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <span className="text-[10px] font-bold text-slate-400">Chọn Tổ:</span>
              <select
                value={myTeam}
                onChange={(e) => {
                  setMyTeam(e.target.value);
                  setIsJoinedTeam(false);
                }}
                className="py-1 px-2 text-[11px] font-extrabold rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300/50 focus:outline-none"
              >
                {TEAMS_LIST.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <Button
              variant="primary"
              size="sm"
              className={`rounded-lg text-[11px] font-black py-1 px-3 transition-all ${
                isJoinedTeam
                  ? "bg-emerald-600 text-white shadow-xs cursor-default"
                  : "bg-amber-500 hover:bg-amber-600 text-white cursor-pointer shadow-md"
              }`}
              onClick={() => {
                setIsJoinedTeam(true);
                addToast({
                  type: "xp",
                  title: `Đã Gia Nhập ${myTeam}! 🛡️`,
                  message: `Bạn đang thi đấu đại diện cho ${myTeam}!`,
                });
              }}
            >
              {isJoinedTeam ? `✓ Đã Vào ${myTeam}` : `Gia Nhập ${myTeam}`}
            </Button>
          </div>
        </div>

        {/* Challenge Box if active - Rich Gold & Deep Blue Polish */}
        <AnimatePresence>
          {quizActive && quizQuestions.length > 0 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="p-4 bg-gradient-to-r from-amber-500/10 via-blue-600/15 to-indigo-600/15 border-b border-amber-200/50 dark:border-amber-800/30 overflow-hidden shadow-inner"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Badge variant="primary" className="font-extrabold text-[10px] bg-blue-600 text-white shadow-xs">
                    ⚡ 100 TEST [{myTeam}]: Câu {quizStep + 1}/{quizQuestions.length}
                  </Badge>
                  {quizQuestions[quizStep]?.level && (
                    <span className="text-[9px] font-bold py-0.5 px-2 rounded-md bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-300/40">
                      {quizQuestions[quizStep].level}
                    </span>
                  )}
                </div>
                <Badge variant="neutral" className="font-bold text-[10px] bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-400/40">
                  🏆 Đúng: {quizScore}
                </Badge>
              </div>

              <p className="text-xs md:text-sm font-extrabold text-slate-900 dark:text-white mb-3 leading-snug">
                {quizQuestions[quizStep].question}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {quizQuestions[quizStep].options.map((opt, i) => {
                  const isSelected = selectedAnswer === i;
                  const isCorrect = i === quizQuestions[quizStep].correct;
                  let btnStyle = "border-slate-200 dark:border-neutral-800 bg-white/90 dark:bg-neutral-900/90 hover:border-blue-400 cursor-pointer text-slate-800 dark:text-slate-200 shadow-xs";
                  if (selectedAnswer !== null) {
                    if (isCorrect) btnStyle = "border-emerald-500 bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 font-extrabold ring-2 ring-emerald-500/30";
                    else if (isSelected) btnStyle = "border-rose-500 bg-rose-500/15 text-rose-800 dark:text-rose-300 font-extrabold ring-2 ring-rose-500/30";
                  }
                  return (
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      key={i}
                      onClick={() => selectedAnswer === null && answerQuiz(i)}
                      disabled={selectedAnswer !== null}
                      className={`p-2.5 rounded-xl text-left text-[11px] font-bold border transition-all flex items-center justify-between ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {selectedAnswer !== null && isCorrect && <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 ml-1" />}
                      {selectedAnswer !== null && isSelected && !isCorrect && <XCircle className="h-4 w-4 text-rose-500 shrink-0 ml-1" />}
                    </motion.button>
                  );
                })}
              </div>

              {selectedAnswer !== null && quizQuestions[quizStep].explanation && (
                <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="mt-2.5 p-2 rounded-lg bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200/50 dark:border-blue-800/40 text-[10px] text-blue-700 dark:text-blue-300 font-medium">
                  💡 <strong>Giải thích:</strong> {quizQuestions[quizStep].explanation}
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tab Content: Chat or Speed Game */}
        {activeTab === "speed_game" ? (
          <div className="p-4 flex-1 overflow-y-auto">
            <SpeedMatchGame pool={vocabPool.current} onBack={() => setActiveTab("chat")} />
          </div>
        ) : isChatHidden ? (
              <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-4 bg-slate-50/10 dark:bg-neutral-950/10">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 flex items-center justify-center text-2xl select-none">
                    💬
                  </div>
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-black border-2 border-white dark:border-neutral-900 animate-bounce">
                      {unreadCount} tin nhắn mới
                    </span>
                  )}
                </div>
                <div className="space-y-1 max-w-sm">
                  <h3 className="text-sm font-black text-slate-800 dark:text-white">Đoạn chat đang ẩn</h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">
                    Bạn đã ẩn cuộc trò chuyện để tập trung học. Thông báo sẽ tự động cập nhật khi có tin nhắn mới gửi đến nhóm.
                  </p>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  className="rounded-xl font-black text-xs text-white bg-blue-600 hover:bg-blue-700 shadow-md cursor-pointer px-4 py-2"
                  onClick={() => {
                    setIsChatHidden(false);
                    setUnreadCount(0);
                  }}
                >
                  Hiện đoạn chat
                </Button>
              </div>
            ) : (
              <>
                {/* Message feed */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((msg) => {
                    if (msg.isSystem) {
                      return (
                        <div key={msg.id} className="flex justify-center">
                          <span className="bg-slate-50 dark:bg-neutral-950 text-[10px] text-slate-500 dark:text-slate-400 py-1 px-3 rounded-full font-bold border border-slate-200 dark:border-neutral-850">
                            {msg.text}
                          </span>
                        </div>
                      );
                    }

                    if (msg.isAi) {
                      return (
                        <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex gap-2.5 max-w-[90%]">
                          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs shadow-md shrink-0">
                            <Bot className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5 mb-1">
                              <span className="text-[10px] font-extrabold text-indigo-600 dark:text-indigo-400">AI Room Mentor</span>
                              <Badge variant="primary" className="text-[8px] px-1.5 py-0">BOT AI</Badge>
                              <span className="text-[8px] text-slate-400 font-semibold">{msg.time}</span>
                            </div>
                            <div className="p-3.5 rounded-2xl rounded-tl-none bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/40 text-xs font-semibold text-slate-800 dark:text-slate-200 leading-relaxed shadow-xs">
                              {msg.text}
                            </div>
                          </div>
                        </motion.div>
                      );
                    }

                    const isMe = msg.user?.id === user?.id || msg.user?.name === (user?.username || "Bạn");
                    const isUserVoiceActive = isMe
                      ? voiceChannel.isConnected && voiceChannel.isSpeaking && !voiceChannel.isMuted
                      : false;
                    return (
                      <motion.div
                        layout
                        key={msg.id}
                        className={`flex items-start gap-2 md:gap-2.5 max-w-[92%] sm:max-w-[85%] ${isMe ? "ml-auto flex-row-reverse" : ""}`}
                      >
                        <div className="relative cursor-pointer" onClick={() => setSelectedMemberModal(msg.user)}>
                          <span className={`text-xl block select-none p-1 rounded-full transition-all ${isUserVoiceActive ? "ring-4 ring-emerald-500/60 bg-emerald-50 dark:bg-emerald-950/40 animate-pulse" : ""}`}>
                            {isMe ? (user?.avatarEmoji || "🦉") : (msg.user?.avatar || "🎓")}
                          </span>
                          {isUserVoiceActive && (
                            <span className="absolute -bottom-1 -right-1 text-[8px] bg-emerald-500 text-white rounded-full px-1 py-0.2 font-black shadow-xs">
                              🎙️
                            </span>
                          )}
                        </div>
                        <div>
                          <div className={`flex items-center gap-1.5 mb-1 ${isMe ? "justify-end" : "justify-start"}`}>
                            <span className="text-[10px] font-extrabold text-slate-700 dark:text-slate-300 cursor-pointer hover:underline" onClick={() => setSelectedMemberModal(msg.user)}>
                              {msg.user?.name}
                            </span>
                            {msg.user?.team && (
                              <Badge variant="neutral" className="text-[8px] px-1.5 py-0 font-bold bg-amber-100 text-amber-800 border-amber-300">
                                {msg.user.team}
                              </Badge>
                            )}
                            <span className="text-[8px] text-slate-400 font-semibold">{msg.time}</span>
                          </div>
                          <div className={`p-2.5 md:p-3 rounded-2xl text-xs font-semibold leading-relaxed break-words ${isMe ? "bg-blue-600 text-white rounded-tr-none" : "bg-slate-50 dark:bg-neutral-950 border border-slate-200/40 dark:border-neutral-850 text-slate-800 dark:text-slate-200 rounded-tl-none"}`}>
                            {msg.text}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                  <div ref={chatEndRef} />
                </div>

                {/* Input box */}
                <div className="p-3 md:p-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:pb-4 border-t border-slate-100 dark:border-neutral-850 bg-slate-50/50 dark:bg-neutral-950">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      className="flex-1 py-2.5 px-4 text-xs font-semibold rounded-xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-850 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-300/30 text-slate-800 dark:text-slate-200"
                      placeholder={`Nhắn tin công khai cùng nhóm (${myTeam}). Gõ @AI để hỏi bài...`}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    />
                    <Button
                      variant="primary"
                      size="md"
                      className="shrink-0 aspect-square rounded-xl cursor-pointer text-white dark:text-white bg-blue-600"
                      onClick={sendMessage}
                      disabled={sendingMsg}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            )}
      </Card>



      {/* Dedicated Team Members Overview Modal */}
      <AnimatePresence>
        {showMembersModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="p-1 rounded-[2.5rem] bg-gradient-to-br from-blue-600/30 via-amber-400/30 to-indigo-700/30 max-w-md w-full shadow-2xl"
            >
              <div className="p-6 rounded-[calc(2.5rem-0.25rem)] bg-white dark:bg-neutral-900 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-neutral-800 pb-3">
                  <h3 className="text-sm font-black text-slate-900 dark:text-white font-display flex items-center gap-2">
                    <Users className="h-4 w-4 text-blue-600" /> Danh Sách Thành Viên ({members.length})
                  </h3>
                  <button className="text-slate-400 hover:text-slate-600 dark:hover:text-white font-bold" onClick={() => setShowMembersModal(false)}>✕</button>
                </div>

                {/* Team Filter Tabs: Đội Mình vs Đội Đối Thủ */}
                <div className="flex p-1 rounded-xl bg-slate-100 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 gap-1">
                  <button
                    onClick={() => setSelectedTeamTab("MY_TEAM")}
                    className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-black transition-all ${
                      selectedTeamTab === "MY_TEAM"
                        ? "bg-amber-500 text-white shadow-xs"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                    }`}
                  >
                    🛡️ {myTeam} (Đội mình)
                  </button>
                  <button
                    onClick={() => setSelectedTeamTab("OPPONENT_TEAM")}
                    className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-black transition-all ${
                      selectedTeamTab === "OPPONENT_TEAM"
                        ? "bg-blue-600 text-white shadow-xs"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                    }`}
                  >
                    ⚔️ {opponentTeam} (Đối thủ)
                  </button>
                </div>

                {selectedTeamTab === "OPPONENT_TEAM" && (
                  <div className="flex items-center justify-between px-1 text-[11px] font-bold text-slate-500">
                    <span>Chọn Tổ đối thủ:</span>
                    <select
                      value={opponentTeam}
                      onChange={(e) => setOpponentTeam(e.target.value)}
                      className="py-0.5 px-2 text-xs font-black rounded-md bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200"
                    >
                      {TEAMS_LIST.filter((t) => t !== myTeam).map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="space-y-2 max-h-[280px] overflow-y-auto pr-1">
                  {members
                    .filter((m) =>
                      selectedTeamTab === "MY_TEAM"
                        ? (m.team || "Tổ 1") === myTeam
                        : (m.team || "Tổ 2") === opponentTeam
                    )
                    .map((m, i) => (
                      <div
                        key={i}
                        onClick={() => {
                          setSelectedMemberModal(m);
                        }}
                        className="p-2.5 rounded-2xl bg-slate-50 dark:bg-neutral-950 border border-slate-200/60 dark:border-neutral-800 flex items-center justify-between hover:border-blue-400 cursor-pointer transition-all group"
                      >
                        <div className="flex items-center gap-2.5 overflow-hidden">
                          <span className="text-2xl shrink-0">{m.avatar}</span>
                          <div className="overflow-hidden">
                            <p className="text-xs font-black text-slate-900 dark:text-white truncate group-hover:text-blue-600">
                              {m.name}
                            </p>
                            <span className="text-[9px] font-extrabold text-amber-600 dark:text-amber-400">
                              {m.team || "Tổ 1"} • {m.level}
                            </span>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <p className="text-xs font-black text-amber-500">{m.xp} XP</p>
                          <span className="text-[9px] font-bold text-blue-600 bg-blue-50 dark:bg-blue-950/50 px-1.5 py-0.5 rounded">
                            Xem chỉ số ➔
                          </span>
                        </div>
                      </div>
                    ))}
                </div>

                <Button variant="primary" size="sm" className="w-full rounded-xl text-xs font-black text-white bg-blue-600" onClick={() => setShowMembersModal(false)}>
                  Đóng danh sách
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hidden Member Details Inspection Modal */}
      <AnimatePresence>
        {selectedMemberModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="p-1 rounded-[2.5rem] bg-gradient-to-br from-amber-400/30 via-blue-600/30 to-indigo-700/30 max-w-sm w-full shadow-2xl"
            >
              <div className="p-6 rounded-[calc(2.5rem-0.25rem)] bg-white dark:bg-neutral-900 space-y-4 text-center">
                <div className="flex justify-end">
                  <button className="text-slate-400 hover:text-slate-600 dark:hover:text-white font-bold" onClick={() => setSelectedMemberModal(null)}>✕</button>
                </div>
                <span className="text-5xl mx-auto block select-none">{selectedMemberModal.avatar || "🎓"}</span>
                <div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white font-display">{selectedMemberModal.name}</h3>
                  <Badge variant="primary" className="bg-amber-500 text-white font-bold mt-1">
                    {selectedMemberModal.team || "Tổ 1"} • {selectedMemberModal.level || "Học viên"}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-2 text-left pt-2">
                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-neutral-950 border border-slate-200/50 dark:border-neutral-800">
                    <p className="text-[9px] font-bold text-slate-400 uppercase">Tổng điểm XP</p>
                    <p className="text-sm font-black text-amber-500">{selectedMemberModal.xp || 1200} XP</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-neutral-950 border border-slate-200/50 dark:border-neutral-800">
                    <p className="text-[9px] font-bold text-slate-400 uppercase">Số câu đúng</p>
                    <p className="text-sm font-black text-emerald-500">{selectedMemberModal.correctAnswers || 48} câu</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-neutral-950 border border-slate-200/50 dark:border-neutral-800">
                    <p className="text-[9px] font-bold text-slate-400 uppercase">Tỷ lệ chính xác</p>
                    <p className="text-sm font-black text-blue-500">{selectedMemberModal.accuracyRate || 88}%</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-neutral-950 border border-slate-200/50 dark:border-neutral-800">
                    <p className="text-[9px] font-bold text-slate-400 uppercase">Chuỗi đúng (Streak)</p>
                    <p className="text-sm font-black text-rose-500">🔥 {selectedMemberModal.streakCount || 5} liên tiếp</p>
                  </div>
                </div>

                <Button variant="primary" size="sm" className="w-full rounded-xl text-xs font-black text-white bg-blue-600" onClick={() => setSelectedMemberModal(null)}>
                  Đóng hồ sơ
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
