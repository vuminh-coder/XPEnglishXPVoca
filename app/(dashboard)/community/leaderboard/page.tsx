"use client";
import React from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { Crown, Medal, Award } from "lucide-react";

export default function LeaderboardPage() {
  const { user } = useUser();

  const leaders = [
    { id: "u4", rank: 1, fullName: "Trần Minh Thư", username: "MinhThu", level: 12, title: "Language Legend", xp: 3200, avatarEmoji: "🦋" },
    { id: "u1", rank: 2, fullName: "Vũ Văn Minh", username: "Aministrator", level: 11, title: "Word Wizard", xp: 2850, avatarEmoji: "🦉" },
    { id: "u2", rank: 3, fullName: "Nguyễn Tuấn", username: "TuanDepTrai", level: 9, title: "Vocabulary Master", xp: 830, avatarEmoji: "🐱" },
    { id: "u6", rank: 4, fullName: "Phạm Thanh Hà", username: "ThanhHa", level: 8, title: "Streak Champion", xp: 710, avatarEmoji: "🌸" },
    { id: "u3", rank: 5, fullName: "Hoàng Anh", username: "HoangAnh", level: 7, title: "Rising Star", xp: 620, avatarEmoji: "🌟" },
  ];

  const top1 = leaders.find(l => l.rank === 1);
  const top2 = leaders.find(l => l.rank === 2);
  const top3 = leaders.find(l => l.rank === 3);
  const otherLeaders = leaders.filter(l => l.rank > 3);

  return (
    <div className="animate-fade-in">
      <div className="page-header animate-fade-in-down mb-8">
        <h1 className="page-title text-3xl font-extrabold tracking-tight">Cộng đồng học tập</h1>
        <p className="page-subtitle text-muted max-w-xl" style={{ marginTop: '6px' }}>
          Bảng xếp hạng tuần của các chiến binh bền bỉ học từ vựng.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1.5 mb-8 bg-black/[0.025] dark:bg-white/[0.025] p-1 rounded-full w-fit border border-black/[0.03] dark:border-white/[0.03] animate-scale-in">
        <Link href="/community" className="px-4 py-2 text-xs font-bold rounded-full text-muted" style={{ transition: 'all 500ms cubic-bezier(0.32, 0.72, 0, 1)' }}>Bảng tin</Link>
        <div className="px-4 py-2 text-xs font-bold rounded-full bg-white dark:bg-neutral-900 text-primary-c shadow-sm">Bảng xếp hạng</div>
        <Link href="/community/friends" className="px-4 py-2 text-xs font-bold rounded-full text-muted" style={{ transition: 'all 500ms cubic-bezier(0.32, 0.72, 0, 1)' }}>Bạn bè</Link>
        <Link href="/community/groups" className="px-4 py-2 text-xs font-bold rounded-full text-muted" style={{ transition: 'all 500ms cubic-bezier(0.32, 0.72, 0, 1)' }}>Nhóm học tập</Link>
      </div>

      <div className="animate-fade-in-up flex flex-col gap-6">
        {/* Podium — Double-Bezel */}
        <div className="bezel">
          <div className="bezel-inner p-8 flex flex-col items-center" style={{ background: 'linear-gradient(180deg, rgba(14, 165, 233, 0.04) 0%, transparent 100%)' }}>
            <h3 className="text-[11px] font-extrabold text-gray-500 uppercase tracking-[0.15em] mb-8 text-center">
              Top 3 Chiến Binh Tuần
            </h3>
            
            <div className="flex items-end justify-center gap-4 sm:gap-8 w-full max-w-lg h-64 select-none">
              {/* Rank 2 */}
              {top2 && (
                <div className="flex flex-col items-center flex-1 h-full justify-end">
                  <div className="text-3xl mb-1.5">{top2.avatarEmoji}</div>
                  <div className="text-xs font-bold truncate max-w-[80px] text-gray-900 dark:text-gray-100">{top2.username}</div>
                  <div className="text-[10px] text-muted mb-3">{top2.xp} XP</div>
                  <div className="w-full bg-gradient-to-t from-slate-200 to-slate-300 dark:from-neutral-800 dark:to-neutral-700 h-28 rounded-t-2xl shadow-sm border-t border-white/30 relative flex flex-col items-center justify-center">
                    <Medal className="w-5 h-5 text-slate-500 absolute top-3" strokeWidth={1.5} />
                    <span className="text-2xl font-black text-white/40 mt-4">2</span>
                  </div>
                </div>
              )}

              {/* Rank 1 */}
              {top1 && (
                <div className="flex flex-col items-center flex-1 h-full justify-end">
                  <div className="relative text-4xl mb-2">
                    <Crown className="w-4 h-4 text-amber-400 absolute -top-4 left-1/2 -translate-x-1/2" strokeWidth={2} />
                    {top1.avatarEmoji}
                  </div>
                  <div className="text-xs font-extrabold truncate max-w-[90px] text-gray-900 dark:text-gray-100">{top1.username}</div>
                  <div className="text-[10px] text-cyan-500 font-bold mb-3">{top1.xp} XP</div>
                  <div className="w-full bg-gradient-to-t from-amber-400 to-amber-500 dark:from-amber-600 dark:to-amber-500 h-36 rounded-t-3xl shadow-md border-t border-amber-300/40 relative flex flex-col items-center justify-center">
                    <Award className="w-6 h-6 text-white/60 absolute top-3" strokeWidth={1.5} />
                    <span className="text-3xl font-black text-white/40 mt-4">1</span>
                  </div>
                </div>
              )}

              {/* Rank 3 */}
              {top3 && (
                <div className="flex flex-col items-center flex-1 h-full justify-end">
                  <div className="text-3xl mb-1.5">{top3.avatarEmoji}</div>
                  <div className="text-xs font-bold truncate max-w-[80px] text-gray-900 dark:text-gray-100">{top3.username}</div>
                  <div className="text-[10px] text-muted mb-3">{top3.xp} XP</div>
                  <div className="w-full bg-gradient-to-t from-amber-700/20 to-amber-800/10 dark:from-neutral-800/80 dark:to-neutral-800/40 h-20 rounded-t-2xl shadow-sm border-t border-white/10 relative flex flex-col items-center justify-center">
                    <Medal className="w-5 h-5 text-amber-600 absolute top-2" strokeWidth={1.5} />
                    <span className="text-xl font-black text-white/30 mt-3">3</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Other Leaderboard — Double-Bezel */}
        <div className="bezel">
          <div className="bezel-inner p-2 flex flex-col">
            {otherLeaders.map((l) => {
              const isCurrentUser = l.fullName === user?.fullName;
              return (
                <div key={l.id} className={`flex items-center justify-between p-4 rounded-[calc(var(--radius-3xl)-6px)] ${isCurrentUser ? "bg-cyan-50/50 dark:bg-cyan-950/10 border border-cyan-200/30 dark:border-cyan-800/20" : ""}`} style={{ transition: 'background 500ms cubic-bezier(0.32, 0.72, 0, 1)' }}>
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-xl bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center font-black text-xs text-muted border border-black/5 dark:border-white/5">
                      {l.rank}
                    </div>
                    <div className="w-9 h-9 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-lg border border-black/5 dark:border-white/5">
                      {l.avatarEmoji}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-gray-900 dark:text-gray-100">{l.fullName} <span className="text-muted">(@{l.username})</span></div>
                      <div className="text-[10px] text-muted font-medium mt-0.5">Cấp độ {l.level} · {l.title}</div>
                    </div>
                  </div>
                  <div className="text-xs font-bold text-cyan-500 bg-cyan-50 dark:bg-cyan-950/30 py-1.5 px-3 rounded-full border border-cyan-100 dark:border-cyan-900/30">
                    {l.xp} XP
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
