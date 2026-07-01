"use client";
import React from "react";
import { useUser } from "@clerk/nextjs";
import { useAuthStore } from "@/lib/store/authStore";
import { getXpProgress } from "@/lib/utils/calculateXP";
import Link from "next/link";
import { Share2, Sparkles } from "lucide-react";

export default function RightSidebar() {
  const { user: clerkUser } = useUser();
  const { user, awardXp } = useAuthStore();
  const currentUser = user;

  if (!currentUser) return null;
  const { current, total, percent } = getXpProgress(
    currentUser.level,
    currentUser.totalXp,
  );

  const achievements = [
    {
      id: "a1",
      name: "Bước đầu",
      icon: "🎓",
      description: "Học 10 từ vựng đầu tiên",
      unlocked: true,
      accent: "from-blue-500/10 to-cyan-500/5 text-blue-500 border-blue-200/30",
    },
    {
      id: "a2",
      name: "5 Ngày Liên",
      icon: "🔥",
      description: "Duy trì streak 5 ngày",
      unlocked: true,
      accent:
        "from-orange-500/10 to-amber-500/5 text-amber-500 border-orange-200/30",
    },
    {
      id: "a3",
      name: "Tuần Chiến",
      icon: "⚔️",
      description: "Học 7 ngày liên tiếp",
      unlocked: true,
      accent: "from-red-500/10 to-rose-500/5 text-red-500 border-red-200/30",
    },
    {
      id: "a4",
      name: "Bách Từ",
      icon: "💯",
      description: "Học được 100 từ vựng",
      unlocked: false,
      accent:
        "from-yellow-500/10 to-amber-500/5 text-yellow-500 border-yellow-200/30",
    },
    {
      id: "a5",
      name: "Xã Hội",
      icon: "🦋",
      description: "Kết bạn với 5 người",
      unlocked: false,
      accent:
        "from-purple-500/10 to-indigo-500/5 text-purple-500 border-purple-200/30",
    },
    {
      id: "a6",
      name: "Quiz Master",
      icon: "🧠",
      description: "Hoàn thành 50 bài quiz",
      unlocked: false,
      accent: "from-pink-500/10 to-rose-500/5 text-pink-500 border-pink-200/30",
    },
  ];

  const suggestedUsers = [
    {
      id: "u2",
      username: "TuanDepTrai",
      level: 9,
      avatarEmoji: "🐱",
      name: "Nguyễn Tuấn",
      totalXp: 2850,
    },
    {
      id: "u3",
      username: "HoangAnh",
      level: 7,
      avatarEmoji: "🌟",
      name: "Hoàng Anh",
      totalXp: 1650,
    },
    {
      id: "u4",
      username: "MinhThu",
      level: 12,
      avatarEmoji: "🦋",
      name: "Minh Thư",
      totalXp: 6850,
    },
  ];

  const shareProgress = () => {
    alert("Đã sao chép liên kết chia sẻ tiến độ học tập!");
    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(
        `Tôi đang học từ vựng tiếng Anh trên XP English! Cấp độ hiện tại: Level ${currentUser.level} (${currentUser.title}). Cùng tham gia với tôi nhé!`,
      );
    }
  };

  return (
    <div className="right-sidebar bg-neutral-50/80 dark:bg-neutral-950/85 backdrop-blur-xl border-l border-black/[0.05] dark:border-white/[0.05] shadow-sm flex flex-col p-5 overflow-y-auto gap-6">
      {/* Profile Box — Double Bezel Premium */}
      <div className="bezel">
        <div className="bezel-inner p-6 flex flex-col items-center text-center bg-white/40 dark:bg-neutral-900/40 relative overflow-hidden">
          {/* Ambient Glow */}
          <div className="absolute -top-10 -left-10 w-24 h-24 bg-cyan-400/15 rounded-full blur-2xl pointer-events-none"></div>
          <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl pointer-events-none"></div>

          {/* Avatar frame */}
          <div className="relative group mb-4">
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400 to-blue-500 rounded-full blur-md opacity-25 group-hover:opacity-50 transition-all duration-700"></div>
            <div className="relative z-10 w-20 h-20 rounded-full border-[3px] border-white dark:border-neutral-800 shadow-md flex items-center justify-center overflow-hidden bg-neutral-100 dark:bg-neutral-800 transition-transform duration-500 group-hover:scale-102">
              {currentUser.imageUrl ? (
                <img
                  src={currentUser.imageUrl}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-3xl select-none">
                  {currentUser.avatarEmoji}
                </span>
              )}
            </div>
          </div>

          <h3 className="text-base font-extrabold text-gray-950 dark:text-white tracking-tight mb-1">
            {currentUser.fullName}
          </h3>

          {/* Level Badge */}
          <span className="inline-flex items-center gap-1.5 px-3 py-2 bg-cyan-50 dark:bg-cyan-950/30 text-cyan-600 dark:text-cyan-400 border border-cyan-200/50 dark:border-cyan-900/30 rounded-full text-[10px] font-black uppercase tracking-wider mb-5">
            Cấp độ {currentUser.level} · {currentUser.title}
          </span>

          {/* XP Progress Section */}
          <div className="w-full text-left bg-black/[0.015] dark:bg-white/[0.015] p-3.5 rounded-2xl border border-black/[0.03] dark:border-white/[0.03] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
            <div className="flex justify-between items-center text-[10px] text-muted mb-2 font-bold uppercase tracking-wider">
              <span>Đến cấp {currentUser.level + 1}</span>
              <span className="text-cyan-500">
                {current}/{total} XP ({percent}%)
              </span>
            </div>
            <div className="h-2 bg-neutral-100 dark:bg-neutral-850 rounded-full overflow-hidden p-[1px] border border-black/5 dark:border-white/5">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500"
                style={{
                  width: `${percent}%`,
                  transition: "width 1000ms cubic-bezier(0.32, 0.72, 0, 1)",
                }}
              ></div>
            </div>
          </div>

          <button
            className="flex items-center justify-center gap-2 w-full mt-5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-full text-xs font-bold py-2.5 px-4 tactile shadow-md shadow-cyan-500/10"
            style={{ transition: "all 500ms cubic-bezier(0.32, 0.72, 0, 1)" }}
            onClick={shareProgress}
          >
            <Share2 className="w-3.5 h-3.5" strokeWidth={2} /> Chia sẻ tiến độ
          </button>
        </div>
      </div>

      {/* Achievements Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-[11px] font-extrabold text-gray-500 dark:text-gray-400 uppercase tracking-[0.15em]">
            Huy hiệu đạt được
          </h4>
          <Link
            href="/profile"
            className="text-[10px] text-cyan-500 hover:text-cyan-600 font-bold transition-colors duration-300"
          >
            Xem tất cả
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-2.5">
          {achievements.map((ach) => (
            <div
              key={ach.id}
              className={`group relative flex flex-col items-center gap-1.5 p-3 rounded-2xl border transition-all duration-500 hover:-translate-y-0.5 cursor-pointer bg-white dark:bg-neutral-900 border-black/[0.04] dark:border-white/[0.04] hover:border-cyan-300 dark:hover:border-cyan-800 shadow-xs hover:shadow-md ${
                ach.unlocked ? "" : "opacity-45 grayscale"
              }`}
            >
              {!ach.unlocked && (
                <span className="text-[9px] absolute top-1.5 right-1.5 text-muted opacity-80 select-none">
                  🔒
                </span>
              )}

              {/* Icon Container with gradient background matching the badge accent */}
              <div
                className={`w-10 h-10 rounded-xl bg-gradient-to-br ${ach.accent.split(" ")[0]} ${ach.accent.split(" ")[1]} border border-black/5 dark:border-white/5 flex items-center justify-center text-xl transition-transform duration-500 group-hover:scale-105`}
              >
                {ach.icon}
              </div>

              <span className="text-[9px] font-black text-center truncate w-full text-gray-800 dark:text-gray-200">
                {ach.name}
              </span>

              {/* Advanced Glass Tooltip */}
              <div className="absolute bottom-full mb-2 hidden group-hover:flex flex-col items-center z-50 pointer-events-none transition-all duration-300">
                <div className="bg-neutral-950/90 text-white text-[10px] p-2.5 rounded-xl shadow-lg w-36 text-center leading-normal border border-white/10 backdrop-blur-md">
                  <div className="font-extrabold mb-0.5 text-cyan-400">
                    {ach.name}
                  </div>
                  <div className="opacity-80 text-[9px] font-medium">
                    {ach.description}
                  </div>
                </div>
                <div className="w-1.5 h-1.5 bg-neutral-950/90 rotate-45 -mt-1 border-r border-b border-white/10"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Suggested Users Section */}
      <div>
        <h4 className="text-[11px] font-extrabold text-gray-500 dark:text-gray-400 uppercase tracking-[0.15em] mb-4">
          Có thể bạn quen
        </h4>
        <div className="flex flex-col gap-2.5">
          {suggestedUsers.map((u) => (
            <div key={u.id} className="bezel lift">
              <div className="bezel-inner p-3 flex justify-between items-center bg-white dark:bg-neutral-900 border-black/[0.04] dark:border-white/[0.04]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center border border-black/5 dark:border-white/5 flex-shrink-0 text-lg">
                    <span className="select-none">{u.avatarEmoji}</span>
                  </div>
                  <div>
                    <div className="text-[11px] font-extrabold text-gray-900 dark:text-gray-100 leading-tight">
                      {u.name}
                    </div>
                    <div className="text-[9px] text-muted font-semibold mt-0.5">
                      <span className="text-cyan-500 font-black">
                        Cấp độ {u.level} ·{" "}
                      </span>
                      <span className="text-red-500 font-black">XP</span>
                      <span className="text-orange-500 font-black">
                        {" "}
                        {u.totalXp}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  className="flex items-center gap-1 bg-neutral-50 dark:bg-neutral-950 text-[9px] font-black uppercase tracking-wider py-1.5 px-3 border border-black/10 dark:border-white/10 rounded-full hover:bg-cyan-50 dark:hover:bg-cyan-950/20 hover:text-cyan-500 hover:border-cyan-200 dark:hover:border-cyan-800 transition-all duration-300 tactile"
                  onClick={() => {
                    awardXp(10);
                    alert(`Đã gửi lời mời kết bạn đến @${u.username}`);
                  }}
                >
                  <Sparkles
                    className="w-2.5 h-2.5 text-cyan-500"
                    strokeWidth={2.5}
                  />{" "}
                  Kết bạn
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
