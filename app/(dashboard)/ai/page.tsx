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
  Zap,
  Mic,
  PenTool,
} from "lucide-react";
import { PageEntranceWrapper, MotionItem } from "@/shared/components/feedback/PageEntranceAnimation";
import { DoubleBezelCard } from "@/shared/components/ui/DoubleBezelCard";
import { Badge } from "@/shared/components/ui/Badge";
import {
  AppTopHeader,
  HeaderPillContainer,
  HeaderPillItem,
} from "@/shared/components/layout/AppTopHeader";

const AI_MODULES = [
  {
    id: "tutor",
    title: "1-on-1 AI Speaking Tutor (Gia Sư AI)",
    subtitle: "Luyện phát âm & Phản xạ hội thoại 24/7",
    description: "Đối thoại trực tiếp bằng giọng nói, chấm điểm phát âm IPA theo thời gian thực, sửa lỗi ngữ điệu và gợi ý câu trả lời tự nhiên.",
    href: "/ai/tutor",
    icon: Bot,
    badge: "Voice & Speech",
    badgeColor: "primary" as const,
    highlights: ["Chấm điểm phát âm IPA chuẩn xác", "Đối thoại tự nhiên 24/7 theo ngữ cảnh", "Gợi ý từ vựng band điểm cao tức thì"],
    cta: "Luyện nói ngay",
  },
  {
    id: "conversation",
    title: "AI Writing & Conversation Coach (Luyện Viết & Chat)",
    subtitle: "Chỉnh sửa bài viết & Phân tích cấu trúc câu",
    description: "Trò chuyện tương tác dạng văn bản, sửa lỗi ngữ pháp chi tiết từng câu, nâng cấp diễn đạt học thuật và giải thích ngữ cảnh.",
    href: "/ai/conversation",
    icon: MessageSquare,
    badge: "Writing & Chat",
    badgeColor: "legendary" as const,
    highlights: ["Sửa lỗi ngữ pháp & dấu câu tức thì", "Nâng cấp từ vựng C1/C2 học thuật", "Hội thoại đa chủ đề đời sống & công việc"],
    cta: "Luyện viết ngay",
  },
];

export default function AIHubPage() {
  return (
    <PageEntranceWrapper className="min-h-screen pb-16">
      {/* ─── 1. STANDARDIZED APPTOPHEADER ─── */}
      <AppTopHeader>
        <HeaderPillContainer>
          <HeaderPillItem
            active
            icon={<Cpu className="w-3.5 h-3.5 text-purple-500" />}
            label="Trung Tâm AI"
          />
          <HeaderPillItem
            href="/ai/tutor"
            icon={<Mic className="w-3.5 h-3.5" />}
            label="Gia Sư Speaking"
          />
          <HeaderPillItem
            href="/ai/conversation"
            icon={<PenTool className="w-3.5 h-3.5" />}
            label="Writing Coach"
          />
        </HeaderPillContainer>
      </AppTopHeader>

      {/* ─── 2. FLUID ULTRA-WIDE MAIN CONTAINER ─── */}
      <div className="w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 space-y-4 sm:space-y-6 pt-1">
        
        {/* HERO AI STAGE */}
        <MotionItem>
          <div className="p-4 sm:p-6 rounded-2xl bg-linear-to-r from-purple-700 via-indigo-700 to-slate-900 text-white shadow-md shadow-purple-500/15 relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 w-48 sm:w-60 h-48 sm:h-60 bg-purple-400/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px] opacity-15 pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6">
              <div className="space-y-1.5 max-w-2xl">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-white/20 text-white border border-white/30 backdrop-blur-md shadow-2xs">
                    Gemini AI 2.0 Engine
                  </span>
                  <span className="text-[11px] font-semibold text-purple-100/80">
                    Gia sư tiếng Anh cá nhân hóa 24/7
                  </span>
                </div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-white font-display">
                  Trung Tâm Trí Tuệ Nhân Tạo (AI Hub)
                </h1>
                <p className="text-xs sm:text-sm text-purple-100/90 leading-relaxed font-normal">
                  Luyện phản xạ giao tiếp tự nhiên và nâng cấp kỹ năng viết tiếng Anh với trợ lý ảo thông minh. Nhận phản hồi chuyên sâu từng âm tiết và cấu trúc ngữ pháp.
                </p>
              </div>

              {/* Quick Summary Pill */}
              <div className="hidden lg:flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-3 shrink-0">
                <div className="w-10 h-10 rounded-lg bg-purple-400/20 border border-purple-400/30 flex items-center justify-center text-purple-300">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-white uppercase tracking-wider">AI Phản Hồi Tức Thì</div>
                  <div className="text-[11px] text-purple-100">Speech & Text Analysis</div>
                </div>
              </div>
            </div>
          </div>
        </MotionItem>

        {/* ─── 3. AI MODULES GRID ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {AI_MODULES.map((mod) => {
            const Icon = mod.icon;
            return (
              <MotionItem key={mod.id}>
                <Link href={mod.href} className="block group h-full">
                  <DoubleBezelCard className="p-5 sm:p-6 h-full flex flex-col justify-between hover:border-purple-500/60 dark:hover:border-purple-500/60 transition-all hover:shadow-lg bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-800">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200/70 dark:border-purple-800/60 flex items-center justify-center text-purple-600 dark:text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300 shadow-2xs">
                          <Icon className="w-6 h-6" strokeWidth={2} />
                        </div>
                        <Badge variant={mod.badgeColor} size="sm">
                          {mod.badge}
                        </Badge>
                      </div>

                      <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white mb-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        {mod.title}
                      </h3>
                      <p className="text-xs font-semibold text-purple-600 dark:text-purple-400 mb-2.5">
                        {mod.subtitle}
                      </p>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                        {mod.description}
                      </p>

                      <div className="space-y-2 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                        {mod.highlights.map((h, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-200">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 pt-3.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-bold text-purple-600 dark:text-purple-400">
                      <span>{mod.cta}</span>
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
