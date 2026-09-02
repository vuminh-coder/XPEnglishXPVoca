"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Headphones,
  Mic,
  BookOpen,
  FileText,
  BookMarked,
  Swords,
  Gamepad2,
  Users,
  Compass,
  ArrowRight,
  Sparkles,
  Zap,
  Flame,
  Layers,
  GraduationCap,
} from "lucide-react";
import { PageEntranceWrapper, MotionItem } from "@/shared/components/feedback/PageEntranceAnimation";
import { DoubleBezelCard } from "@/shared/components/ui/DoubleBezelCard";
import { Badge } from "@/shared/components/ui/Badge";
import {
  AppTopHeader,
  HeaderPillContainer,
  HeaderPillItem,
} from "@/shared/components/layout/AppTopHeader";

interface StudyModule {
  id: string;
  category: "skills" | "gamification" | "grammar_exam" | "roadmap";
  title: string;
  subtitle: string;
  description: string;
  href: string;
  icon: React.ElementType;
  accentGradient: string;
  iconBg: string;
  iconColor: string;
  badge: string;
  badgeVariant: "primary" | "success" | "warning" | "danger" | "legendary" | "neutral";
  stats: string;
}

const STUDY_MODULES: StudyModule[] = [
  {
    id: "listening",
    category: "skills",
    title: "Luyện Nghe (Dictation)",
    subtitle: "Chép chính tả 3 cấp độ",
    description: "Nghe chép chính tả từng câu với audio bản xứ chuẩn xác, waveform trực quan và tra từ điển 1 chạm.",
    href: "/study/listening",
    icon: Headphones,
    accentGradient: "from-emerald-500/10 to-teal-500/5 hover:border-emerald-500/50",
    iconBg: "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200/70 dark:border-emerald-800/60",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    badge: "100+ Bài audio",
    badgeVariant: "success",
    stats: "Nghe + Phản xạ",
  },
  {
    id: "shadowing",
    category: "skills",
    title: "Luyện Nói (Shadowing)",
    subtitle: "AI chấm phát âm 6 tiêu chí",
    description: "Nhại giọng người bản xứ, thu âm trực tiếp và nhận phản hồi chi tiết về phát âm IPA, ngữ điệu và độ lưu loát.",
    href: "/study/shadowing",
    icon: Mic,
    accentGradient: "from-blue-500/10 to-indigo-500/5 hover:border-[#0059bb]/50",
    iconBg: "bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-400 border border-blue-200/70 dark:border-blue-800/60",
    iconColor: "text-[#0059bb] dark:text-sky-400",
    badge: "Gemini AI Speech",
    badgeVariant: "primary",
    stats: "Chấm điểm IPA",
  },
  {
    id: "reading",
    category: "skills",
    title: "Luyện Đọc (Reading Studio)",
    subtitle: "Bài đọc A1 - C1 & Tra từ",
    description: "Đọc hiểu văn bản học thuật & tin tức thương mại, tra cứu nghĩa/IPA tức thì và làm bài trắc nghiệm tương tác.",
    href: "/study/reading",
    icon: BookOpen,
    accentGradient: "from-indigo-500/10 to-sky-500/5 hover:border-indigo-500/50",
    iconBg: "bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/70 dark:border-indigo-800/60",
    iconColor: "text-indigo-600 dark:text-indigo-400",
    badge: "Tra từ 1 chạm",
    badgeVariant: "primary",
    stats: "Từ vựng ngữ cảnh",
  },
  {
    id: "practice",
    category: "skills",
    title: "Luyện Từ Vựng (Practice)",
    subtitle: "Spaced Repetition SM-2",
    description: "Ôn tập từ vựng chủ đề, phản xạ 4 lựa chọn, flashcards lật thẻ và thuật toán ghi nhớ ngắt quãng tối ưu.",
    href: "/study/practice",
    icon: BookMarked,
    accentGradient: "from-amber-500/10 to-yellow-500/5 hover:border-amber-500/50",
    iconBg: "bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-200/70 dark:border-amber-800/60",
    iconColor: "text-amber-600 dark:text-amber-400",
    badge: "Thuật toán SM-2",
    badgeVariant: "warning",
    stats: "Chống quên từ",
  },
  {
    id: "grammar",
    category: "grammar_exam",
    title: "Ngữ Pháp AI (Grammar Hub)",
    subtitle: "50+ Chủ điểm & Luyện tập AI",
    description: "Hệ thống chuyên đề ngữ pháp toàn diện từ cơ bản đến nâng cao với sơ đồ tư duy và AI giải thích sâu.",
    href: "/study/grammar",
    icon: Sparkles,
    accentGradient: "from-purple-500/10 to-indigo-500/5 hover:border-purple-500/50",
    iconBg: "bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 border border-purple-200/70 dark:border-purple-800/60",
    iconColor: "text-purple-600 dark:text-purple-400",
    badge: "AI Giải thích",
    badgeVariant: "legendary",
    stats: "50+ Chuyên đề",
  },
  {
    id: "exam-prep",
    category: "grammar_exam",
    title: "Thi Thử Đề Chuẩn (Exam Prep)",
    subtitle: "Format TOEIC & IELTS 4 kỹ năng",
    description: "37 đề thi thử mô phỏng phòng thi thật với đồng hồ đếm ngược, chấm điểm tức thì và phân tích chi tiết từng phần.",
    href: "/study/exam-prep",
    icon: FileText,
    accentGradient: "from-rose-500/10 to-red-500/5 hover:border-rose-500/50",
    iconBg: "bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200/70 dark:border-rose-800/60",
    iconColor: "text-rose-600 dark:text-rose-400",
    badge: "37 Đề thi thật",
    badgeVariant: "danger",
    stats: "TOEIC & IELTS",
  },
  {
    id: "pvp",
    category: "gamification",
    title: "Đấu Trường 1v1 (PvP Arena)",
    subtitle: "Thách đấu đối kháng Realtime",
    description: "Thách đấu tốc độ từ vựng thời gian thực cùng bạn bè hoặc đối thủ ngẫu nhiên, tích lũy cúp và leo rank Đại Cao Thủ.",
    href: "/study/pvp",
    icon: Swords,
    accentGradient: "from-amber-500/10 to-orange-500/5 hover:border-amber-500/50",
    iconBg: "bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-200/70 dark:border-amber-800/60",
    iconColor: "text-amber-600 dark:text-amber-400",
    badge: "Realtime PvP",
    badgeVariant: "warning",
    stats: "Đua Top BXH",
  },
  {
    id: "games",
    category: "gamification",
    title: "Mini Games (Speed Match)",
    subtitle: "Word Scramble & Memory Match",
    description: "Ghép từ và giải mã xáo trộn chữ cái dưới áp lực thời gian. Phương pháp kích hoạt trí nhớ vui nhộn và gây nghiện.",
    href: "/study/games",
    icon: Gamepad2,
    accentGradient: "from-sky-500/10 to-blue-500/5 hover:border-sky-500/50",
    iconBg: "bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 border border-sky-200/70 dark:border-sky-800/60",
    iconColor: "text-sky-600 dark:text-sky-400",
    badge: "Mini Games",
    badgeVariant: "neutral",
    stats: "Phản xạ nhanh",
  },
  {
    id: "rooms",
    category: "gamification",
    title: "Phòng Học Nhóm (Study Rooms)",
    subtitle: "Pomodoro & Voice Channel",
    description: "Cùng học trực tuyến theo phương pháp Pomodoro 25/5, voice channel thảo luận và duy trì kỷ luật học tập mỗi ngày.",
    href: "/study/rooms",
    icon: Users,
    accentGradient: "from-teal-500/10 to-emerald-500/5 hover:border-teal-500/50",
    iconBg: "bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 border border-teal-200/70 dark:border-teal-800/60",
    iconColor: "text-teal-600 dark:text-teal-400",
    badge: "Pomodoro + Voice",
    badgeVariant: "success",
    stats: "Học tập nhóm",
  },
  {
    id: "plan",
    category: "roadmap",
    title: "Lộ Trình & Kế Hoạch (Study Plan)",
    subtitle: "Mục tiêu hàng ngày & Streak",
    description: "Theo dõi tiến độ học tập khoa học, cá nhân hóa lộ trình dựa trên mục tiêu TOEIC/IELTS và nhận thưởng XP đều đặn.",
    href: "/roadmap",
    icon: Compass,
    accentGradient: "from-blue-500/10 to-indigo-500/5 hover:border-[#0059bb]/50",
    iconBg: "bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-400 border border-blue-200/70 dark:border-blue-800/60",
    iconColor: "text-[#0059bb] dark:text-sky-400",
    badge: "Lộ trình AI",
    badgeVariant: "primary",
    stats: "Theo dõi mục tiêu",
  },
];

export default function StudyHubPage() {
  const [filterCategory, setFilterCategory] = useState<"all" | "skills" | "grammar_exam" | "gamification">("all");

  const filteredModules = STUDY_MODULES.filter((m) => {
    if (filterCategory === "all") return true;
    if (filterCategory === "skills") return m.category === "skills";
    if (filterCategory === "grammar_exam") return m.category === "grammar_exam";
    if (filterCategory === "gamification") return m.category === "gamification" || m.category === "roadmap";
    return true;
  });

  return (
    <PageEntranceWrapper className="min-h-screen pb-16">
      {/* ─── 1. STANDARDIZED APPTOPHEADER ─── */}
      <AppTopHeader>
        <HeaderPillContainer>
          <HeaderPillItem
            active={filterCategory === "all"}
            onClick={() => setFilterCategory("all")}
            icon={<Layers className="w-3.5 h-3.5" />}
            label="Tất cả (10)"
          />
          <HeaderPillItem
            active={filterCategory === "skills"}
            onClick={() => setFilterCategory("skills")}
            icon={<Headphones className="w-3.5 h-3.5" />}
            label="4 Kỹ năng"
          />
          <HeaderPillItem
            active={filterCategory === "grammar_exam"}
            onClick={() => setFilterCategory("grammar_exam")}
            icon={<Sparkles className="w-3.5 h-3.5" />}
            label="Ngữ pháp & Thi"
          />
          <HeaderPillItem
            active={filterCategory === "gamification"}
            onClick={() => setFilterCategory("gamification")}
            icon={<Swords className="w-3.5 h-3.5" />}
            label="Đấu trường & Game"
            hideOnSmall
          />
        </HeaderPillContainer>
      </AppTopHeader>

      {/* ─── 2. FLUID ULTRA-WIDE MAIN CONTAINER ─── */}
      <div className="w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 space-y-4 sm:space-y-6 pt-1">
        
        {/* HERO SPOTLIGHT STAGE */}
        <MotionItem>
          <div className="p-4 sm:p-6 rounded-2xl bg-linear-to-r from-[#0059bb] via-[#004799] to-[#002b5b] text-white shadow-md shadow-[#0059bb]/15 relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 w-48 sm:w-60 h-48 sm:h-60 bg-sky-400/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px] opacity-15 pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6">
              <div className="space-y-1.5 max-w-2xl">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-white/20 text-white border border-white/30 backdrop-blur-md shadow-2xs">
                    Trung Tâm Luyện Tập Toàn Diện
                  </span>
                  <span className="text-[11px] font-semibold text-blue-100/80">
                    10 phương pháp học khoa học & chuẩn format
                  </span>
                </div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-white font-display">
                  Chọn Phương Pháp Luyện Tập Phù Hợp
                </h1>
                <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed font-normal">
                  Tất cả chế độ học được tích hợp công nghệ AI Tutor, thuật toán Spaced Repetition SM-2 và hệ thống cộng thưởng XP liên tục giúp bạn bứt phá band điểm.
                </p>
              </div>

              {/* Quick Summary Pill on Desktop */}
              <div className="hidden lg:flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-3 shrink-0">
                <div className="w-10 h-10 rounded-lg bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-amber-300">
                  <Zap className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-white uppercase tracking-wider">Học tập chủ động</div>
                  <div className="text-[11px] text-blue-100">10 Chế độ tương tác cao</div>
                </div>
              </div>
            </div>
          </div>
        </MotionItem>

        {/* ─── 3. STUDY MODULES GRID (FLUID 3-COLUMN) ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredModules.map((mod) => {
            const Icon = mod.icon;
            return (
              <MotionItem key={mod.id}>
                <Link href={mod.href} className="block group h-full">
                  <DoubleBezelCard className={`p-4 sm:p-5 h-full flex flex-col justify-between transition-all hover:shadow-lg border-slate-200/90 dark:border-slate-800 hover:border-[#0059bb] dark:hover:border-[#0059bb] bg-white dark:bg-slate-900 bg-linear-to-br ${mod.accentGradient}`}>
                    <div>
                      {/* Top Row: Icon + Badge */}
                      <div className="flex items-center justify-between gap-2 mb-3.5">
                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform duration-300 ${mod.iconBg}`}>
                          <Icon className="w-5 h-5" strokeWidth={2.2} />
                        </div>
                        <Badge variant={mod.badgeVariant} size="sm">
                          {mod.badge}
                        </Badge>
                      </div>

                      {/* Title & Subtitle */}
                      <h3 className="text-base font-black text-slate-900 dark:text-white group-hover:text-[#0059bb] dark:group-hover:text-sky-400 transition-colors">
                        {mod.title}
                      </h3>
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5 mb-2">
                        {mod.subtitle}
                      </p>

                      {/* Description */}
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                        {mod.description}
                      </p>
                    </div>

                    {/* Footer Action Row */}
                    <div className="mt-5 pt-3.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
                      <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                        {mod.stats}
                      </span>
                      <div className="flex items-center gap-1 font-bold text-[#0059bb] dark:text-sky-400 group-hover:translate-x-0.5 transition-transform">
                        <span>Bắt đầu học</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </DoubleBezelCard>
                </Link>
              </MotionItem>
            );
          })}
        </div>
      </div>
    </PageEntranceWrapper>
  );
}
