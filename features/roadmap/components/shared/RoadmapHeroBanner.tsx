"use client";
import React from "react";
import { Sparkles, Trophy, Target, ArrowRight, RefreshCw } from "lucide-react";

interface RoadmapHeroBannerProps {
  mode: "pathway" | "goal-setting";
  userName?: string;
  currentActiveExam?: string;
  currentActiveScore?: string;
  overallProgress?: number;
  onOpenForm?: () => void;
  onOpenChatbot?: () => void;
}

export const RoadmapHeroBanner: React.FC<RoadmapHeroBannerProps> = ({
  mode,
  userName = "Học Viên",
  currentActiveExam = "TOEIC",
  currentActiveScore = "750",
  overallProgress = 0,
  onOpenForm,
  onOpenChatbot,
}) => {
  if (mode === "goal-setting") {
    return (
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#0059bb] via-[#004fba] to-[#00388a] text-white shadow-md shadow-blue-900/20 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-56 h-56 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-1 rounded-lg text-xs font-black uppercase tracking-wider bg-amber-400/20 text-amber-200 border border-amber-300/30 flex items-center gap-1.5 font-display shadow-2xs">
              <Target className="w-3.5 h-3.5 text-amber-300" /> AI Goal Setting Step
            </span>
            <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-white/15 text-white border border-white/20 font-mono">
              Khung Chuẩn CEFR, TOEIC & IELTS
            </span>
          </div>

          <div className="space-y-1">
            <h1 className="text-base sm:text-lg font-bold font-display tracking-tight text-white flex items-center gap-2">
              <span>
                Thiết Kế Lộ Trình Học AI Cho <span className="text-amber-300">{userName}</span>
              </span>
              <Sparkles className="w-4 h-4 text-amber-300 fill-amber-300" />
            </h1>
            <div className="flex items-center justify-between gap-3 flex-wrap pt-1">
              <p className="text-xs text-blue-100/90 font-medium leading-relaxed max-w-2xl">
                Chọn mục tiêu của bạn bên dưới. AI sẽ khởi tạo giáo án bài học chuyên sâu chi tiết từng chặng phù hợp 100% với điểm số đó.
              </p>
              {onOpenChatbot && (
                <button
                  type="button"
                  onClick={onOpenChatbot}
                  className="h-8.5 px-3.5 rounded-xl bg-white text-[#0059bb] hover:bg-amber-300 hover:text-slate-950 text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer font-display active:scale-95 shrink-0"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Mở Bong Bóng Chatbot Lộ Trình</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // mode === "pathway"
  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#0059bb] via-[#004fba] to-[#00388a] text-white shadow-md shadow-blue-900/20 relative overflow-hidden">
      <div className="absolute -right-10 -bottom-10 w-56 h-56 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-10 -top-10 w-48 h-48 bg-indigo-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 sm:gap-4">
        <div className="space-y-1.5 max-w-2xl">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-1 rounded-lg text-xs font-black uppercase tracking-wider bg-amber-400/20 text-amber-200 border border-amber-300/30 flex items-center gap-1.5 font-display shadow-2xs">
              <Trophy className="w-3.5 h-3.5 text-amber-300" /> Lộ Trình AI
            </span>
            <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-white/15 text-white border border-white/20 font-mono">
              {currentActiveExam} Target: {currentActiveScore}
            </span>
          </div>

          <div className="space-y-0.5">
            <h1 className="text-base sm:text-lg font-bold font-display tracking-tight text-white flex items-center gap-2">
              <span>Giáo Án Luyện Thi {currentActiveExam} {currentActiveScore}</span>
              <Sparkles className="w-4 h-4 text-amber-300 fill-amber-300" />
            </h1>
            <p className="text-xs text-blue-100/90 font-medium leading-relaxed">
              Tối ưu cá nhân hóa riêng cho học viên <strong className="text-amber-300 font-bold">{userName}</strong> để chinh phục {currentActiveExam} {currentActiveScore}.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between w-full md:w-auto gap-3 shrink-0">
          <div className="p-2.5 rounded-xl bg-white/10 dark:bg-slate-900/60 border border-white/20 backdrop-blur-md flex items-center gap-2.5 shadow-2xs">
            <div className="w-8 h-8 rounded-xl bg-amber-400/20 border border-amber-300/40 flex items-center justify-center text-amber-300 shrink-0">
              <Trophy className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-blue-200 font-display">Tiến độ</div>
              <div className="text-xs font-black font-display text-white font-mono">{overallProgress}% Hoàn Thành</div>
            </div>
          </div>

          {onOpenForm && (
            <button
              onClick={onOpenForm}
              className="px-3.5 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-bold border border-white/30 transition-all flex items-center gap-1.5 font-display shrink-0 cursor-pointer shadow-2xs"
            >
              <RefreshCw className="w-3.5 h-3.5 text-amber-300" />
              <span>Đổi Mục Tiêu AI</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
