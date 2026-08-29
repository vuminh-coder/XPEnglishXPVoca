"use client";

import React from "react";
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
} from "lucide-react";
import { PageEntranceWrapper, MotionItem } from "@/shared/components/feedback/PageEntranceAnimation";
import { DoubleBezelCard } from "@/shared/components/ui/DoubleBezelCard";
import { Badge } from "@/shared/components/ui/Badge";

const STUDY_MODULES = [
  {
    id: "listening",
    title: "Luyện Nghe (Dictation)",
    description: "Nghe chép chính tả từng câu, sóng âm bản xứ, tra từ điển tức thì và luyện tai chuẩn xác.",
    href: "/study/listening",
    icon: Headphones,
    color: "emerald",
    badge: "100+ Bài",
    badgeColor: "success" as const,
  },
  {
    id: "shadowing",
    title: "Luyện Nói (Shadowing)",
    description: "Nhại giọng bản xứ, thu âm trực tiếp và nhận phản hồi chấm điểm phát âm AI 6 tiêu chí.",
    href: "/study/shadowing",
    icon: Mic,
    color: "blue",
    badge: "AI Chấm điểm",
    badgeColor: "primary" as const,
  },
  {
    id: "reading",
    title: "Luyện Đọc (Reading Studio)",
    description: "Đọc hiểu văn bản học thuật & thương mại, tra cứu IPA tức thì, trắc nghiệm tương tác.",
    href: "/study/reading",
    icon: BookOpen,
    color: "indigo",
    badge: "Tra từ 1 chạm",
    badgeColor: "primary" as const,
  },
  {
    id: "practice",
    title: "Luyện Từ Vựng (Practice)",
    description: "Ôn tập từ vựng chủ đề, phản xạ nhanh, flashcards và ghi nhớ ngắt quãng SM-2.",
    href: "/study/practice",
    icon: BookMarked,
    color: "amber",
    badge: "SM-2 Thuật toán",
    badgeColor: "warning" as const,
  },
  {
    id: "grammar",
    title: "Ngữ Pháp AI (Grammar Hub)",
    description: "Hệ thống 50+ chủ điểm ngữ pháp trọng tâm, bài tập tương tác và giải thích AI chi tiết.",
    href: "/study/grammar",
    icon: Sparkles,
    color: "purple",
    badge: "AI Giải thích",
    badgeColor: "legendary" as const,
  },
  {
    id: "exam-prep",
    title: "Thi Thử Đề Chuẩn (Exam Prep)",
    description: "37 đề thi thử chuẩn format TOEIC, IELTS 4 kỹ năng kèm phân tích điểm số chuyên sâu.",
    href: "/study/exam-prep",
    icon: FileText,
    color: "rose",
    badge: "TOEIC & IELTS",
    badgeColor: "danger" as const,
  },
  {
    id: "pvp",
    title: "Đấu Trường 1v1 (PvP)",
    description: "Thách đấu từ vựng thời gian thực với bạn bè hoặc đối thủ ngẫu nhiên, leo rank cao thủ.",
    href: "/study/pvp",
    icon: Swords,
    color: "amber",
    badge: "Realtime",
    badgeColor: "warning" as const,
  },
  {
    id: "games",
    title: "Trò Chơi Nối Từ (Speed Match)",
    description: "Ghép từ và nghĩa thần tốc dưới áp lực thời gian, rèn luyện phản xạ ngôn ngữ.",
    href: "/study/games",
    icon: Gamepad2,
    color: "sky",
    badge: "Thử thách",
    badgeColor: "neutral" as const,
  },
  {
    id: "rooms",
    title: "Phòng Học Nhóm (Study Rooms)",
    description: "Tham gia phòng học Pomodoro trực tuyến, voice channel và tương tác cùng cộng đồng.",
    href: "/study/rooms",
    icon: Users,
    color: "teal",
    badge: "Voice & Chat",
    badgeColor: "success" as const,
  },
  {
    id: "plan",
    title: "Kế Hoạch Học Tập (Study Plan)",
    description: "Theo dõi mục tiêu học tập hàng ngày, hoàn thành nhiệm vụ và nhận thưởng XP.",
    href: "/roadmap",
    icon: Compass,
    color: "blue",
    badge: "Lộ trình",
    badgeColor: "primary" as const,
  },
];

export default function StudyHubPage() {
  return (
    <PageEntranceWrapper className="min-h-screen pb-16">
      {/* Top Header */}
      <div className="h-14 border-b border-slate-200/90 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-20 flex items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xs bg-[#0059bb]/10 dark:bg-[#0059bb]/20 flex items-center justify-center text-[#0059bb]">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white tracking-tight">
              Trung Tâm Luyện Tập (Study Hub)
            </h1>
          </div>
        </div>
        <Badge variant="primary" size="sm">
          10 Chế Độ Học
        </Badge>
      </div>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        <MotionItem className="mb-6">
          <div className="p-4 sm:p-5 rounded-xs border border-slate-200/90 dark:border-slate-800 bg-linear-to-r from-blue-50/70 via-indigo-50/40 to-white dark:from-blue-950/20 dark:via-indigo-950/10 dark:to-slate-900">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-1">
              Chọn phương pháp luyện tập phù hợp với bạn
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Tất cả các chế độ luyện tập đều được thiết kế tối ưu theo phương pháp học ngôn ngữ chủ động, tích hợp AI hỗ trợ và hệ thống tính điểm XP chuẩn xác.
            </p>
          </div>
        </MotionItem>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {STUDY_MODULES.map((mod) => {
            const Icon = mod.icon;
            return (
              <MotionItem key={mod.id}>
                <Link href={mod.href} className="block group">
                  <DoubleBezelCard className="p-4 sm:p-5 h-full flex flex-col justify-between hover:border-[#0059bb] transition-all hover:shadow-md">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 rounded-xs bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-200 group-hover:bg-[#0059bb] group-hover:text-white transition-colors">
                          <Icon className="w-5 h-5" />
                        </div>
                        <Badge variant={mod.badgeColor} size="sm">
                          {mod.badge}
                        </Badge>
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mb-1.5 group-hover:text-[#0059bb] transition-colors">
                        {mod.title}
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                        {mod.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold text-[#0059bb]">
                      <span>Bắt đầu học ngay</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
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
