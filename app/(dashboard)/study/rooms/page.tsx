"use client";
import React, { useState, useEffect, useRef } from "react";
import { Card, Button, Badge } from "@/components/ui";
import { useAuthStore } from "@/lib/store/authStore";
import { useNotificationStore } from "@/lib/store/notificationStore";
import {
  Users,
  MessageSquare,
  Send,
  Trophy,
  ArrowRight,
  BookOpen,
  Volume2,
  Zap,
  Sparkles,
  Layers,
} from "lucide-react";

interface UserProfile {
  name: string;
  avatar: string;
  level: string;
  xp: number;
}

interface Message {
  id: string;
  user: UserProfile;
  text: string;
  time: string;
  isSystem?: boolean;
}

const STUDY_ROOMS = [
  {
    id: "room_toeic",
    name: "TOEIC 900+ Target",
    description: "Nhóm cùng ôn tập từ vựng TOEIC nâng cao và cấu trúc đề thi.",
    onlineCount: 14,
    category: "TOEIC",
    chatSeed: [
      "Hôm nay có ai làm thử TOEIC Part 7 chưa?",
      "Bài đọc dài quá, mình đang căn giờ 1 phút mỗi câu.",
      "Có mẹo nào nhớ từ vựng nhanh không các bác?",
      "Mình dùng Spaced Repetition của app thấy thuộc nhanh hẳn đấy!",
    ],
  },
  {
    id: "room_ielts",
    name: "IELTS Speaking & Writing",
    description: "Luyện phát âm, viết bài luận và chia sẻ template band 7.5+.",
    onlineCount: 9,
    category: "IELTS",
    chatSeed: [
      "AI Writing sửa bài viết chi tiết thật sự.",
      "Bạn được band mấy rồi? Mình đang phấn đấu lên 7.0.",
      "Trợ lý nói nói chuyện vui phết, nghe phát âm tự nhiên.",
      "Tối nay có ai rảnh vào đấu PvP từ vựng không?",
    ],
  },
  {
    id: "room_basic",
    name: "Học từ vựng mỗi ngày",
    description: "Nơi chia sẻ bộ từ, chơi mini games và cổ vũ tinh thần học tập.",
    onlineCount: 22,
    category: "Tổng quát",
    chatSeed: [
      "Vừa lật bài Memory Match được 100 XP sướng ghê!",
      "Hôm nay mình giữ được streak 15 ngày rồi.",
      "Mọi người thường học mấy từ một ngày thế?",
      "Khoảng 15-20 từ là vừa đủ để ôn lại hàng ngày á.",
    ],
  },
];

const RANDOM_USERS: UserProfile[] = [
  { name: "Minh Vu", avatar: "👨‍💻", level: "Intermediate", xp: 1250 },
  { name: "Jenny Tran", avatar: "👩‍🎨", level: "Advanced", xp: 3400 },
  { name: "Alex Pham", avatar: "👨‍🚀", level: "Beginner", xp: 450 },
  { name: "Sophie Le", avatar: "👩‍⚕️", level: "Advanced", xp: 2800 },
  { name: "David Nguyen", avatar: "👨‍✈️", level: "Intermediate", xp: 1980 },
];

export default function GroupRoomsPage() {
  const { user, awardXp } = useAuthStore();
  const { addToast } = useNotificationStore();
  const [activeRoom, setActiveRoom] = useState<typeof STUDY_ROOMS[0] | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [members, setMembers] = useState<UserProfile[]>([]);
  
  // Quiz states
  const [quizActive, setQuizActive] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);

  const QUIZ_QUESTIONS = [
    {
      q: "Từ nào đồng nghĩa với 'innovative'?",
      options: ["Traditional", "Creative", "Obsolete", "Passive"],
      correct: 1,
    },
    {
      q: "Điền giới từ: 'She is capable _____ solving this complex problem.'",
      options: ["of", "to", "with", "for"],
      correct: 0,
    },
    {
      q: "Từ nào trái nghĩa với 'diligent'?",
      options: ["Hardworking", "Lazy", "Attentive", "Eager"],
      correct: 1,
    },
  ];

  // Join Room logic
  const joinRoom = (room: typeof STUDY_ROOMS[0]) => {
    setActiveRoom(room);
    setQuizActive(false);
    setQuizStep(0);
    setQuizScore(0);
    setSelectedAnswer(null);

    // Initial messages
    const initialMsgs: Message[] = room.chatSeed.map((text, i) => ({
      id: `seed_${i}`,
      user: RANDOM_USERS[i % RANDOM_USERS.length],
      text,
      time: `11:${40 + i}`,
    }));
    setMessages([
      { id: "sys_join", user: { name: "Hệ thống", avatar: "📢", level: "", xp: 0 }, text: `Bạn đã tham gia phòng ${room.name}!`, time: "Vừa xong", isSystem: true },
      ...initialMsgs,
    ]);

    // Active members
    setMembers([
      ...RANDOM_USERS,
      { name: user?.username || "Bạn", avatar: "🎓", level: "Beginner", xp: 100 },
    ]);
  };

  // Scroll to bottom on new message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Simulate active chat
  useEffect(() => {
    if (!activeRoom || quizActive) return;

    const interval = setInterval(() => {
      const phrases = [
        "Đúng vậy á!",
        "Ai có link tài liệu ôn tập không gửi mình với.",
        "Cố lên mọi người ơi, sắp đạt mục tiêu ngày rồi.",
        "Hôm nay học từ mới phê thật.",
        "Tiện ghê, ứng dụng này mượt quá.",
        "Tẹo nữa rủ nhau chơi xếp chữ nhé!",
      ];
      const randomUser = RANDOM_USERS[Math.floor(Math.random() * RANDOM_USERS.length)];
      const randomText = phrases[Math.floor(Math.random() * phrases.length)];

      setMessages((prev) => [
        ...prev,
        {
          id: `sim_${Date.now()}`,
          user: randomUser,
          text: randomText,
          time: "Vừa xong",
        },
      ]);
    }, 8000);

    return () => clearInterval(interval);
  }, [activeRoom, quizActive]);

  // Send message
  const sendMessage = () => {
    if (!inputValue.trim() || !activeRoom) return;
    const newMsg: Message = {
      id: `user_${Date.now()}`,
      user: {
        name: user?.username || "Bạn",
        avatar: "🎓",
        level: "Pro",
        xp: 1500,
      },
      text: inputValue,
      time: "Vừa xong",
    };
    setMessages((prev) => [...prev, newMsg]);
    setInputValue("");

    // Bot reply simulation
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `reply_${Date.now()}`,
          user: RANDOM_USERS[Math.floor(Math.random() * RANDOM_USERS.length)],
          text: "Chào bạn mới nhé! Chúc học vui vẻ.",
          time: "Vừa xong",
        },
      ]);
    }, 1500);
  };

  // Quiz interactive loop
  const answerQuiz = (index: number) => {
    setSelectedAnswer(index);
    const correct = index === QUIZ_QUESTIONS[quizStep].correct;
    if (correct) {
      setQuizScore((s) => s + 1);
    }

    setTimeout(() => {
      if (quizStep < QUIZ_QUESTIONS.length - 1) {
        setQuizStep((s) => s + 1);
        setSelectedAnswer(null);
      } else {
        // Quiz completed
        setQuizActive(false);
        const earnedXp = quizScore * 15 + 10;
        awardXp(earnedXp);
        addToast({
          type: "xp",
          title: `+${earnedXp} XP!`,
          message: `Thử thách nhóm hoàn thành! Đúng ${quizScore}/${QUIZ_QUESTIONS.length}`,
        });
        setMessages((prev) => [
          ...prev,
          {
            id: `system_quiz_${Date.now()}`,
            user: { name: "Hệ thống", avatar: "🏆", level: "", xp: 0 },
            text: `Thử thách nhóm vừa kết thúc. Bạn đạt được ${quizScore}/${QUIZ_QUESTIONS.length} câu đúng và nhận ${earnedXp} XP!`,
            time: "Vừa xong",
            isSystem: true,
          },
        ]);
      }
    }, 1500);
  };

  // Main list view
  if (!activeRoom) {
    return (
      <div className="animate-fade-in max-w-3xl mx-auto space-y-6 pb-20 md:pb-6">
        <div className="page-header animate-fade-in-down">
          <h1 className="page-title text-3xl font-extrabold tracking-tight flex items-center gap-2">
            <Users className="h-7 w-7 text-indigo-500" /> Phòng Học Nhóm Live
          </h1>
          <p className="page-subtitle text-muted mt-1">
            Tham gia phòng học nhóm trực tuyến để cùng chia sẻ kinh nghiệm học tập, chat realtime và thử thách từ vựng.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {STUDY_ROOMS.map((room) => (
            <Card key={room.id} variant="bezel" hoverable className="p-6 flex flex-col justify-between h-[200px]">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="primary">{room.category}</Badge>
                  <span className="text-xs text-muted flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    {room.onlineCount} online
                  </span>
                </div>
                <h3 className="text-sm font-black text-slate-800 dark:text-white">{room.name}</h3>
                <p className="text-[11px] text-muted mt-1.5 line-clamp-2 leading-relaxed">{room.description}</p>
              </div>
              <Button variant="primary" size="sm" className="w-full justify-center mt-4" onClick={() => joinRoom(room)}>
                Tham gia phòng <ArrowRight className="h-3.5 w-3.5 ml-1" />
              </Button>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Room view
  return (
    <div className="animate-fade-in max-w-5xl mx-auto grid md:grid-cols-4 gap-5 h-[calc(100vh-140px)] pb-20 md:pb-6">
      {/* Main chat column */}
      <Card variant="bezel" className="md:col-span-3 flex flex-col h-full overflow-hidden p-0 border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
        {/* Room Header */}
        <div className="p-4 border-b border-slate-100 dark:border-neutral-800 flex items-center justify-between bg-slate-50/50 dark:bg-neutral-900/50">
          <div>
            <h2 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
              {activeRoom.name}
            </h2>
            <p className="text-[10px] text-muted">{activeRoom.description}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" onClick={() => setQuizActive(true)} disabled={quizActive}>
              <Sparkles className="h-3.5 w-3.5 text-amber-500 mr-1" /> Thử thách nhóm
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setActiveRoom(null)}>Rời phòng</Button>
          </div>
        </div>

        {/* Challenge Box if active */}
        {quizActive && (
          <div className="p-4 bg-gradient-to-r from-violet-500/10 to-indigo-500/10 border-b border-violet-100 dark:border-violet-950/30 animate-fade-in">
            <div className="flex items-center justify-between mb-3">
              <Badge variant="primary">Thử thách học nhóm: Câu {quizStep + 1}/3</Badge>
              <Badge variant="neutral">Đúng: {quizScore}</Badge>
            </div>
            <p className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-3">
              {QUIZ_QUESTIONS[quizStep].q}
            </p>
            <div className="grid grid-cols-2 gap-2">
              {QUIZ_QUESTIONS[quizStep].options.map((opt, i) => {
                const isSelected = selectedAnswer === i;
                const isCorrect = i === QUIZ_QUESTIONS[quizStep].correct;
                let btnStyle = "border-slate-200 bg-white dark:bg-neutral-800 hover:border-slate-300";
                if (selectedAnswer !== null) {
                  if (isCorrect) btnStyle = "border-emerald-400 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400";
                  else if (isSelected) btnStyle = "border-rose-400 bg-rose-50 text-rose-700 dark:bg-rose-950/20 dark:text-rose-400";
                }
                return (
                  <button
                    key={i}
                    onClick={() => selectedAnswer === null && answerQuiz(i)}
                    disabled={selectedAnswer !== null}
                    className={`p-2.5 rounded-xl text-left text-[11px] font-bold border transition-all ${btnStyle}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Message area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => {
            if (msg.isSystem) {
              return (
                <div key={msg.id} className="flex justify-center animate-fade-in">
                  <span className="bg-slate-100 dark:bg-neutral-800 text-[10px] text-muted py-1 px-3 rounded-full font-bold">
                    {msg.text}
                  </span>
                </div>
              );
            }
            const isMe = msg.user.name === (user?.username || "Bạn");
            return (
              <div key={msg.id} className={`flex items-start gap-2.5 max-w-[85%] ${isMe ? "ml-auto flex-row-reverse" : ""}`}>
                <span className="text-xl shrink-0 select-none">{msg.user.avatar}</span>
                <div>
                  <div className="flex items-center gap-1.5 mb-1 justify-start">
                    <span className="text-[10px] font-extrabold text-slate-700 dark:text-slate-300">{msg.user.name}</span>
                    {msg.user.level && <Badge variant="neutral" className="text-[8px] px-1 py-0">{msg.user.level}</Badge>}
                    <span className="text-[8px] text-muted">{msg.time}</span>
                  </div>
                  <div className={`p-3 rounded-2xl text-xs font-medium leading-relaxed ${isMe ? "bg-violet-600 text-white rounded-tr-none" : "bg-slate-100 dark:bg-neutral-800 text-slate-800 dark:text-slate-100 rounded-tl-none"}`}>
                    {msg.text}
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={chatEndRef} />
        </div>

        {/* Input box */}
        <div className="p-4 border-t border-slate-100 dark:border-neutral-800 flex gap-2 bg-slate-50/50 dark:bg-neutral-900/50">
          <input
            type="text"
            className="flex-1 py-2.5 px-4 text-xs font-medium rounded-xl bg-white dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700 focus:outline-none focus:border-violet-400"
            placeholder="Nhập tin nhắn..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <Button variant="primary" size="md" className="shrink-0 aspect-square" onClick={sendMessage}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </Card>

      {/* Online Users List */}
      <Card variant="bezel" className="hidden md:block h-full p-4 overflow-y-auto">
        <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-wider mb-4">Đang trực tuyến ({members.length})</h3>
        <div className="space-y-3">
          {members.map((member, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-xl">{member.avatar}</span>
              <div className="flex-1 overflow-hidden">
                <p className="text-[11px] font-bold text-slate-800 dark:text-white truncate">{member.name}</p>
                <p className="text-[9px] text-muted">{member.xp} XP • {member.level || "Học viên"}</p>
              </div>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
