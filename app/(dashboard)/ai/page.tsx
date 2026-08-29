"use client";

import React from "react";
import Link from "next/link";
import {
  Bot,
  MessageSquare,
  Sparkles,
  ArrowRight,
  Headphones,
  CheckCircle2,
  Cpu,
} from "lucide-react";
import { PageEntranceWrapper, MotionItem } from "@/shared/components/feedback/PageEntranceAnimation";
import { DoubleBezelCard } from "@/shared/components/ui/DoubleBezelCard";
import { Badge } from "@/shared/components/ui/Badge";

const AI_MODULES = [
  {
    id: "tutor",
    title: "1-on-1 AI Speaking Tutor (Gia Sư AI)",
    description: "Luyện phát âm, đối thoại trực tiếp theo chủ đề, chỉnh sửa lỗi ngữ pháp và nhận gợi ý từ vựng theo thời gian thực.",
    href: "/ai/tutor",
    icon: Bot,
    badge: "Voice & Speech",
    badgeColor: "primary" as const,
    highlights: ["Chấm điểm phát âm IPA", "Đối thoại tự nhiên 24/7", "Đa dạng chủ đề giao tiếp"],
  },
  {
    id: "conversation",
    title: "AI Writing & Conversation Coach (Luyện Viết & Chat)",
    description: "Trò chuyện tương tác, luyện viết câu/đoạn văn, nâng cấp từ vựng band điểm cao và giải thích chi tiết cấu trúc câu.",
    href: "/ai/conversation",
    icon: MessageSquare,
    badge: "Writing & Chat",
    badgeColor: "legendary" as const,
    highlights: ["Sửa lỗi ngữ pháp tức thì", "Gợi ý từ vựng nâng cao", "Hội thoại ngữ cảnh thực tế"],
  },
];

export default function AIHubPage() {
  return (
    <PageEntranceWrapper className="min-h-screen pb-16">
      {/* Top Header */}
      <div className="h-14 border-b border-slate-200/90 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-20 flex items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xs bg-purple-500/10 dark:bg-purple-500/20 flex items-center justify-center text-purple-600 dark:text-purple-400">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white tracking-tight">
              Trung Tâm Trí Tuệ Nhân Tạo (AI Learning Hub)
            </h1>
          </div>
        </div>
        <Badge variant="primary" size="sm">
          Gemini AI Powered
        </Badge>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-6">
        <MotionItem className="mb-6">
          <div className="p-4 sm:p-6 rounded-xs border border-purple-200/70 dark:border-purple-900/40 bg-linear-to-r from-purple-50/60 via-indigo-50/40 to-white dark:from-purple-950/20 dark:via-indigo-950/10 dark:to-slate-900">
            <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Gia Sư Ngôn Ngữ AI Cá Nhân Hóa</span>
            </div>
            <h2 className="text-base sm:text-xl font-bold text-slate-900 dark:text-white mb-1.5">
              Học Tiếng Anh Thông Minh Cùng AI Mọi Lúc, Mọi Nơi
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
              Hệ thống trợ lý ảo thông minh giúp bạn luyện phát âm chuẩn, tăng tốc phản xạ giao tiếp và nâng cao kỹ năng viết với phản hồi tức thì.
            </p>
          </div>
        </MotionItem>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {AI_MODULES.map((mod) => {
            const Icon = mod.icon;
            return (
              <MotionItem key={mod.id}>
                <Link href={mod.href} className="block group h-full">
                  <DoubleBezelCard className="p-5 sm:p-6 h-full flex flex-col justify-between hover:border-purple-500 transition-all hover:shadow-lg">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-xs bg-purple-50 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-900/50 flex items-center justify-center text-purple-600 dark:text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                          <Icon className="w-6 h-6" />
                        </div>
                        <Badge variant={mod.badgeColor} size="sm">
                          {mod.badge}
                        </Badge>
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        {mod.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                        {mod.description}
                      </p>

                      <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                        {mod.highlights.map((h, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold text-purple-600 dark:text-purple-400">
                      <span>Bắt đầu phiên học</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
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
