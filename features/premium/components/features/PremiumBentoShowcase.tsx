"use client";

import React from "react";
import {
  Bot,
  FileText,
  Sparkles,
  Flame,
  ShieldCheck,
  Zap,
  CheckCircle,
} from "lucide-react";
import { Badge } from "@/shared/components/ui/Badge";
import { ExamType } from "../../types";
import { WAVEFORM_BAR_HEIGHTS } from "../../constants";

export interface PremiumBentoShowcaseProps {
  targetExam: ExamType;
  currentScore: number;
  setCurrentScore: (score: number) => void;
  estimatedProScore: number;
  onSelectExam: (exam: ExamType) => void;
}

export function PremiumBentoShowcase({
  targetExam,
  currentScore,
  setCurrentScore,
  estimatedProScore,
  onSelectExam,
}: PremiumBentoShowcaseProps) {
  return (
    <div className="space-y-4 sm:space-y-5 pt-1">
      <div className="text-center max-w-xl mx-auto space-y-1">
        <Badge variant="primary" size="sm">Trực Quan Hóa Tính Năng</Badge>
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white font-display tracking-tight">
          Trải Nghiệm Công Nghệ Học Độc Quyền
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
          Khám phá sức mạnh thực tế của các công cụ AI và phương pháp học thông minh
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Teaser 1: AI Voice Waveform & IPA Accuracy */}
        <div className="p-4 sm:p-4.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-3 flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 transition-all">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 flex items-center justify-center shadow-2xs border border-purple-200/60 dark:border-purple-800/40">
                <Bot className="w-4.5 h-4.5 stroke-[2.2]" />
              </div>
              <Badge variant="legendary" size="sm">Gemini AI 2.0</Badge>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-display">
              Gia Sư AI Speaking Đo Chuẩn IPA
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              Phân tích sóng âm thời gian thực, đối chiếu phát âm với người bản xứ và sửa lỗi ngữ điệu từng từ.
            </p>
          </div>

          {/* Animated Waveform Simulation Box */}
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700 space-y-2 shadow-2xs">
            <div className="flex items-center justify-between text-[11px] font-bold">
              <span className="text-slate-500">Độ chuẩn xác IPA</span>
              <span className="text-emerald-500 font-black font-mono">98.4% NATIVE MATCH</span>
            </div>
            <div className="flex items-end justify-between gap-1 h-7 px-0.5">
              {WAVEFORM_BAR_HEIGHTS.map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-full bg-gradient-to-t from-purple-500 to-indigo-400 animate-pulse"
                  style={{
                    height: `${h}%`,
                    animationDuration: `${0.8 + (i % 5) * 0.2}s`,
                    animationDelay: `${(i % 4) * 0.15}s`,
                  }}
                />
              ))}
            </div>
            <div className="text-[10px] text-purple-600 dark:text-purple-400 font-mono font-bold text-center truncate">
              /ɪkˈstrɔːrdəneri/ • Nhấn đúng trọng âm 2
            </div>
          </div>
        </div>

        {/* Teaser 2: Interactive Score Improvement Gauge Simulator */}
        <div className="p-4 sm:p-4.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-3 flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 transition-all">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-[#0059bb] dark:text-sky-400 flex items-center justify-center shadow-2xs border border-blue-200/60 dark:border-blue-800/40">
                <FileText className="w-4.5 h-4.5 stroke-[2.2]" />
              </div>
              <Badge variant="primary" size="sm">37+ Đề Thi Thử</Badge>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-display">
              Mô Phỏng Tăng Điểm Thi Chuẩn
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              Kéo thanh trượt để xem ngay mức điểm bứt phá dự kiến cùng trợ lý luyện thi PRO.
            </p>
          </div>

          {/* Interactive Simulator Box with Range Slider */}
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700 space-y-2.5 shadow-2xs">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-500 text-[11px]">Mục tiêu:</span>
              <div className="flex gap-1 p-0.5 rounded-full bg-slate-200/80 dark:bg-slate-700/80">
                <button
                  type="button"
                  onClick={() => onSelectExam("toeic")}
                  className={`px-3 py-0.5 rounded-full text-[10.5px] font-bold cursor-pointer transition-all ${
                    targetExam === "toeic"
                      ? "bg-[#0059bb] text-white shadow-2xs"
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  TOEIC
                </button>
                <button
                  type="button"
                  onClick={() => onSelectExam("ielts")}
                  className={`px-3 py-0.5 rounded-full text-[10.5px] font-bold cursor-pointer transition-all ${
                    targetExam === "ielts"
                      ? "bg-[#0059bb] text-white shadow-2xs"
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  IELTS
                </button>
              </div>
            </div>

            {/* Range Slider */}
            <input
              type="range"
              min={targetExam === "toeic" ? 400 : 4.0}
              max={targetExam === "toeic" ? 850 : 7.5}
              step={targetExam === "toeic" ? 25 : 0.5}
              value={currentScore}
              onChange={(e) => setCurrentScore(Number(e.target.value))}
              className="w-full accent-[#0059bb] cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full"
              title="Kéo để đổi điểm hiện tại"
            />

            <div className="flex items-center justify-between py-0.5 font-display">
              <div>
                <div className="text-[9.5px] text-slate-400 font-mono">Điểm hiện tại</div>
                <div className="text-base font-bold text-slate-700 dark:text-slate-200">{currentScore}</div>
              </div>
              <span className="text-[#0059bb] dark:text-sky-400 font-black text-sm">➔</span>
              <div className="text-right">
                <div className="text-[9.5px] text-emerald-500 font-bold font-mono">Dự kiến với PRO</div>
                <div className="text-lg font-black text-emerald-600 dark:text-emerald-400">{estimatedProScore}+</div>
              </div>
            </div>
          </div>
        </div>

        {/* Teaser 3: SM-2 Spaced Repetition Memory Curve */}
        <div className="p-4 sm:p-4.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-3 flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 transition-all">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center shadow-2xs border border-amber-200/60 dark:border-amber-800/40">
                <Sparkles className="w-4.5 h-4.5 stroke-[2.2]" />
              </div>
              <Badge variant="warning" size="sm">Thuật Toán SM-2</Badge>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-display">
              Đập Tan Đường Cong Quên Lãng
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              Hệ thống tự động nhắc nhở ôn tập từ vựng đúng thời điểm vàng, đưa từ vựng vào trí nhớ vĩnh viễn.
            </p>
          </div>

          {/* Graph Graphic Simulation with Milestones */}
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700 space-y-2 shadow-2xs">
            <div className="flex items-center justify-between text-[11px] font-bold">
              <span className="text-slate-500">Độ lưu giữ trí nhớ:</span>
              <span className="text-amber-600 dark:text-amber-400 font-black">95% sau 6 tháng</span>
            </div>
            <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-amber-400 to-emerald-500 w-[95%]" />
            </div>
            <div className="flex justify-between text-[10px] text-slate-400 font-medium">
              <span>Học vẹt: Quên 80% (3 ngày)</span>
              <span className="text-emerald-500 font-bold">SM-2: Nhớ 95%</span>
            </div>
          </div>
        </div>

        {/* Teaser 4: Immortal Streak Shield - Enriched to eliminate empty void */}
        <div className="p-4 sm:p-4.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-3 flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 transition-all">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center shadow-2xs border border-amber-200/60 dark:border-amber-800/40">
                <Flame className="w-4.5 h-4.5 stroke-[2.2]" />
              </div>
              <Badge variant="warning" size="sm">Streak Bất Tử</Badge>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-display">
              Bảo Vệ Ngọn Lửa Streak Tự Động
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              Không bao giờ lo đứt chuỗi ngọn lửa học tập khi bạn lỡ bận việc đột xuất 1-2 ngày.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700 space-y-2 shadow-2xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-amber-100 dark:bg-amber-950/60 flex items-center justify-center shadow-2xs shrink-0">
                  <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">Khiên Kim Cương PRO</div>
                  <div className="text-[10px] text-emerald-500 font-semibold">Tự động kích hoạt khi vắng mặt</div>
                </div>
              </div>
              <ShieldCheck className="w-5 h-5 text-emerald-500 stroke-[2.2] shrink-0" />
            </div>
            <div className="pt-1.5 border-t border-slate-200/50 dark:border-slate-700/50 flex items-center justify-between text-[10.5px] text-slate-500 font-medium">
              <span>Trạng thái bảo hộ:</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <CheckCircle className="w-3 h-3" /> Luôn sẵn sàng 24/7
              </span>
            </div>
          </div>
        </div>

        {/* Teaser 5: X2 Speed Multiplier for XP & Rank (2 Columns) */}
        <div className="p-4 sm:p-4.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-3 flex flex-col justify-between md:col-span-2 lg:col-span-2 hover:border-slate-300 dark:hover:border-slate-700 transition-all">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-[#0059bb] dark:text-sky-400 flex items-center justify-center shadow-2xs border border-blue-200/60 dark:border-blue-800/40">
                <Zap className="w-4.5 h-4.5 stroke-[2.2]" />
              </div>
              <Badge variant="primary" size="sm">2X XP Boost</Badge>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-display">
              Nhân Đôi Tốc Độ Tích Lũy XP & Thống Lĩnh Bảng Vàng
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              Tăng gấp đôi toàn bộ số điểm kinh nghiệm nhận được từ Dictation, Shadowing, Reading và Đấu trường 1v1 PvP.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700 grid grid-cols-1 sm:grid-cols-2 gap-2.5 items-center shadow-2xs">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 flex items-center justify-center text-xs font-black shadow-2xs shrink-0">
                2X
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-white">Tài khoản PRO VIP</div>
                <div className="text-[10.5px] text-slate-500 dark:text-slate-400">Áp dụng cho mọi bài học & minigame</div>
              </div>
            </div>
            <div className="text-left sm:text-right sm:border-l sm:border-slate-200 dark:sm:border-slate-700 sm:pl-3">
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                Luyện 15 phút = +120 XP (thay vì +60 XP)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
