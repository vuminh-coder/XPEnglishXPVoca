import React from "react";
import Link from "next/link";
import {
  BookOpen,
  Sparkles,
  Headphones,
  ShieldAlert,
  Clock,
  BarChart3,
  Brain,
  Zap,
  RefreshCw,
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Award,
  Layers,
  Bookmark,
} from "lucide-react";
import { ExamResultSummary } from "@/features/exam-prep/utils/examScoringEngine";

export interface ResultAiDiagnosticTabProps {
  examResult: ExamResultSummary;
  overallAiAdvice: {
    loading: boolean;
    content?: string;
    potentialScore?: string;
    topFocus?: string;
  } | null;
  onGetOverallAiAdvice: () => void;
  onNavigateToReview: () => void;
  onNavigateToReviewPart: (partNumber: number) => void;
}

export function ResultAiDiagnosticTab({
  examResult,
  overallAiAdvice,
  onGetOverallAiAdvice,
  onNavigateToReview,
  onNavigateToReviewPart,
}: ResultAiDiagnosticTabProps) {
  // Calculate 5-axis competency scores from examResult
  const listeningParts = examResult.partAnalysis.filter((p) => p.partNumber <= 4);
  const readingParts = examResult.partAnalysis.filter((p) => p.partNumber > 4);

  const listeningAcc =
    listeningParts.length > 0
      ? Math.round(
          listeningParts.reduce((acc, p) => acc + p.accuracyPercent, 0) /
            listeningParts.length,
        )
      : examResult.accuracyPercent;

  const readingAcc =
    readingParts.length > 0
      ? Math.round(
          readingParts.reduce((acc, p) => acc + p.accuracyPercent, 0) /
            readingParts.length,
        )
      : examResult.accuracyPercent;

  const grammarAcc = Math.max(
    25,
    Math.min(95, Math.round(readingAcc * 0.95 + 10)),
  );
  const vocabAcc = Math.max(
    30,
    Math.min(95, Math.round((listeningAcc + readingAcc) / 2)),
  );
  const trapDefenseAcc = Math.max(
    25,
    Math.min(
      90,
      Math.round(
        100 - (examResult.incorrectCount / examResult.totalQuestions) * 75,
      ),
    ),
  );
  const speedScore = Math.max(
    40,
    Math.min(
      98,
      Math.round(100 - Math.max(0, examResult.avgTimePerQuestion - 15) * 2.5),
    ),
  );

  const powerIndex = Math.round(
    (vocabAcc + grammarAcc + listeningAcc + trapDefenseAcc + speedScore) / 5,
  );

  const targetProjectionMin = Math.min(
    examResult.maxScore,
    examResult.scaledScore + 200,
  );
  const targetProjectionMax = Math.min(
    examResult.maxScore,
    examResult.scaledScore + 260,
  );

  // SVG Radar geometry calculations: clean, crisp, large geometry (radius = 105, center = 140, 140, viewBox = 280 x 280)
  const angles = [
    -Math.PI / 2,
    -Math.PI / 2 + (2 * Math.PI) / 5,
    -Math.PI / 2 + (4 * Math.PI) / 5,
    -Math.PI / 2 + (6 * Math.PI) / 5,
    -Math.PI / 2 + (8 * Math.PI) / 5,
  ];

  const competencies = [
    {
      label: "Từ vựng ETS",
      val: vocabAcc,
      icon: BookOpen,
      color: "text-blue-600 dark:text-sky-400",
      bgColor: "bg-blue-500",
      status:
        vocabAcc >= 70
          ? "Thành thạo"
          : vocabAcc >= 50
            ? "Khá"
            : "Cần bổ sung",
    },
    {
      label: "Ngữ pháp cốt lõi",
      val: grammarAcc,
      icon: Sparkles,
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-500",
      status:
        grammarAcc >= 70
          ? "Vững vàng"
          : grammarAcc >= 50
            ? "Trung bình"
            : "Cần củng cố",
    },
    {
      label: "Phản xạ âm thanh",
      val: listeningAcc,
      icon: Headphones,
      color: "text-emerald-600 dark:text-emerald-400",
      bgColor: "bg-emerald-500",
      status:
        listeningAcc >= 70
          ? "Nhạy bén"
          : listeningAcc >= 50
            ? "Khá"
            : "Ưu tiên luyện",
    },
    {
      label: "Bắt bẫy đề thi",
      val: trapDefenseAcc,
      icon: ShieldAlert,
      color: "text-rose-600 dark:text-rose-400",
      bgColor: "bg-rose-500",
      status:
        trapDefenseAcc >= 70
          ? "Cảnh giác cao"
          : trapDefenseAcc >= 50
            ? "Cẩn thận"
            : "Dễ mắc bẫy",
    },
    {
      label: "Tốc độ đọc lướt",
      val: speedScore,
      icon: Clock,
      color: "text-amber-600 dark:text-amber-400",
      bgColor: "bg-amber-500",
      status:
        speedScore >= 80
          ? "Rất nhanh"
          : speedScore >= 60
            ? "Tốt"
            : "Cần tăng tốc",
    },
  ];

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* ========================================================= */}
      {/* TẦNG 1: ASYMMETRICAL BENTO: GRAND RADAR (8 CỘT) VS DỰ PHÓNG (4 CỘT) */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-stretch">
        {/* 1.1 GRAND RADAR HERO STUDIO (8 CỘT - KHỐI NỔI BẬT LỚN, SẮC NÉT, TINH TẾ) */}
        <div className="lg:col-span-8 p-5 sm:p-7 rounded-2xl bg-white dark:bg-slate-900 border-2 border-[#0059bb]/30 dark:border-[#0059bb]/40 shadow-md shadow-[#0059bb]/5 flex flex-col justify-between space-y-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#0059bb]/5 dark:bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

          {/* Header Khối Radar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3.5 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-[#0059bb] text-white flex items-center justify-center shadow-md shadow-[#0059bb]/20 shrink-0">
                <BarChart3 className="w-6 h-6" strokeWidth={2.2} />
              </div>
              <div>
                <div className="text-xs font-black text-[#0059bb] dark:text-sky-400 uppercase tracking-widest font-sans">
                  Chỉ Số Phân Tích Chuyên Sâu
                </div>
                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white font-display">
                  Radar Năng Lực 5 Trục Cốt Lõi
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-center">
              <span className="px-3.5 py-1.5 rounded-xl bg-[#0059bb]/10 dark:bg-sky-500/15 text-[#0059bb] dark:text-sky-300 text-xs font-mono font-black border border-[#0059bb]/25 dark:border-sky-500/30 shadow-2xs">
                Sức Mạnh: {powerIndex}/100
              </span>
            </div>
          </div>

          {/* Bố cục Radar: SVG Radar Lớn, Tinh Tế, Sắc Nét + 5 Thẻ Năng Lực Vi Mô */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center relative z-10 py-1">
            {/* SVG Radar Polygon To Hơn, Siêu Sắc Nét với Màu Sắc Trục Đồng Bộ Chuẩn Xác (sm:col-span-6) */}
            <div className="sm:col-span-6 flex flex-col items-center justify-center">
              <div className="relative w-full max-w-[350px] h-[300px] flex items-center justify-center">
                <svg className="w-full h-full drop-shadow-sm" viewBox="0 0 380 310">
                  <defs>
                    {/* Rich Multi-Color Polygon Gradient */}
                    <radialGradient id="radarMultiColorGrad" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#0059bb" stopOpacity="0.32" />
                      <stop offset="40%" stopColor="#8b5cf6" stopOpacity="0.25" />
                      <stop offset="75%" stopColor="#10b981" stopOpacity="0.22" />
                      <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.20" />
                    </radialGradient>
                    <linearGradient id="polygonStrokeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#0059bb" />
                      <stop offset="25%" stopColor="#8b5cf6" />
                      <stop offset="55%" stopColor="#10b981" />
                      <stop offset="80%" stopColor="#f43f5e" />
                      <stop offset="100%" stopColor="#f59e0b" />
                    </linearGradient>
                  </defs>

                  {/* Concentric Background Web Polygons (20%, 40%, 60%, 80%, 100%) - Siêu Sắc Nét */}
                  {[0.2, 0.4, 0.6, 0.8, 1.0].map((scale, ringIdx) => {
                    const ringPoints = angles.map((angle) => {
                      const x = 190 + 108 * scale * Math.cos(angle);
                      const y = 155 + 108 * scale * Math.sin(angle);
                      return `${x},${y}`;
                    }).join(" ");
                    return (
                      <polygon
                        key={ringIdx}
                        points={ringPoints}
                        fill={ringIdx % 2 === 0 ? "rgba(241, 245, 249, 0.65)" : "rgba(248, 250, 252, 0.3)"}
                        stroke="currentColor"
                        strokeWidth={ringIdx === 4 ? "1.8" : "1.2"}
                        strokeDasharray={ringIdx === 4 ? "none" : "4 4"}
                        className={ringIdx === 4
                          ? "text-slate-400 dark:text-slate-500"
                          : "text-slate-300 dark:text-slate-700"
                        }
                      />
                    );
                  })}

                  {/* Radial Axis Lines */}
                  {angles.map((angle, lineIdx) => {
                    const x = 190 + 108 * Math.cos(angle);
                    const y = 155 + 108 * Math.sin(angle);
                    return (
                      <line
                        key={lineIdx}
                        x1={190}
                        y1={155}
                        x2={x}
                        y2={y}
                        stroke="currentColor"
                        strokeWidth="1.2"
                        className="text-slate-300 dark:text-slate-700"
                      />
                    );
                  })}

                  {/* User Skill Polygon Fill & Multi-Color Crisp Border */}
                  <polygon
                    points={competencies.map((c, i) => {
                      const r = (108 * Math.max(15, c.val)) / 100;
                      const x = 190 + r * Math.cos(angles[i]);
                      const y = 155 + r * Math.sin(angles[i]);
                      return `${x},${y}`;
                    }).join(" ")}
                    fill="url(#radarMultiColorGrad)"
                    stroke="url(#polygonStrokeGrad)"
                    strokeWidth="3"
                    strokeLinejoin="round"
                    className="transition-all duration-1000 ease-out drop-shadow-sm"
                  />

                  {/* Data Point Glow Rings & Dots với Màu Sắc Tương Ứng Từng Góc */}
                  {(() => {
                    const nodeThemeColors = [
                      { pulse: "fill-[#0059bb]/35", stroke: "stroke-[#0059bb] dark:stroke-sky-400", dot: "fill-[#0059bb] dark:fill-sky-400" },
                      { pulse: "fill-purple-500/35", stroke: "stroke-purple-600 dark:stroke-purple-400", dot: "fill-purple-600 dark:fill-purple-400" },
                      { pulse: "fill-emerald-500/35", stroke: "stroke-emerald-600 dark:stroke-emerald-400", dot: "fill-emerald-600 dark:fill-emerald-400" },
                      { pulse: "fill-rose-500/35", stroke: "stroke-rose-600 dark:stroke-rose-400", dot: "fill-rose-600 dark:fill-rose-400" },
                      { pulse: "fill-amber-500/35", stroke: "stroke-amber-600 dark:stroke-amber-400", dot: "fill-amber-600 dark:fill-amber-400" },
                    ];

                    return competencies.map((c, i) => {
                      const r = (108 * Math.max(15, c.val)) / 100;
                      const cx = 190 + r * Math.cos(angles[i]);
                      const cy = 155 + r * Math.sin(angles[i]);
                      const theme = nodeThemeColors[i];

                      return (
                        <g key={i}>
                          <circle
                            cx={cx}
                            cy={cy}
                            r="7"
                            className={`${theme.pulse} animate-pulse`}
                          />
                          <circle
                            cx={cx}
                            cy={cy}
                            r="4.5"
                            className={`fill-white dark:fill-slate-900 ${theme.stroke} stroke-2 shadow-xs`}
                          />
                          <circle
                            cx={cx}
                            cy={cy}
                            r="2.5"
                            className={theme.dot}
                          />
                        </g>
                      );
                    });
                  })()}

                  {/* 5 Tiêu Chí Bố Trí Trực Tiếp Tại 5 Góc */}
                  {(() => {
                    const cornerConfigs = [
                      { text: "Từ vựng ETS", fill: "fill-[#0059bb] dark:fill-sky-400", anchor: "middle" as const, dx: 0, dy: -14 },
                      { text: "Ngữ pháp", fill: "fill-purple-600 dark:fill-purple-400", anchor: "start" as const, dx: 12, dy: 4 },
                      { text: "Phản xạ âm", fill: "fill-emerald-600 dark:fill-emerald-400", anchor: "start" as const, dx: 12, dy: 14 },
                      { text: "Bắt bẫy đề", fill: "fill-rose-600 dark:fill-rose-400", anchor: "end" as const, dx: -12, dy: 14 },
                      { text: "Tốc độ đọc", fill: "fill-amber-600 dark:fill-amber-400", anchor: "end" as const, dx: -12, dy: 4 },
                    ];

                    return competencies.map((c, i) => {
                      const cfg = cornerConfigs[i];
                      const tx = 190 + 108 * Math.cos(angles[i]) + cfg.dx;
                      const ty = 155 + 108 * Math.sin(angles[i]) + cfg.dy;
                      return (
                        <text
                          key={i}
                          x={tx}
                          y={ty}
                          textAnchor={cfg.anchor}
                          className={`text-[12px] font-black font-sans ${cfg.fill} select-none tracking-tight drop-shadow-2xs`}
                        >
                          {cfg.text}
                        </text>
                      );
                    });
                  })()}
                </svg>
              </div>
            </div>

            {/* 5 Thẻ Năng Lực Chi Tiết Cân Đối Tuyệt Đối (sm:col-span-6) */}
            <div className="sm:col-span-6 space-y-2 font-sans">
              {competencies.map((c, idx) => {
                const IconComp = c.icon;
                return (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 hover:border-[#0059bb]/40 dark:hover:border-sky-500/40 transition-all space-y-1.5 shadow-2xs group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                        <IconComp className={`w-3.5 h-3.5 ${c.color}`} />
                        <span>{c.label}</span>
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10.5px] font-medium text-slate-500 dark:text-slate-400 font-sans">
                          {c.status}
                        </span>
                        <span className="font-mono font-black text-slate-900 dark:text-white text-xs">
                          {c.val}%
                        </span>
                      </div>
                    </div>
                    {/* Gradient Progress Bar */}
                    <div className="w-full h-1.5 rounded-full bg-slate-200/80 dark:bg-slate-700 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${c.bgColor} transition-all duration-1000`}
                        style={{ width: `${c.val}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer Radar Card */}
          <div className="p-3 rounded-xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-900/40 text-xs text-slate-600 dark:text-slate-300 font-sans flex items-center gap-2 relative z-10">
            <Sparkles className="w-4 h-4 text-[#0059bb] dark:text-sky-400 shrink-0" />
            <span>Hệ thống phân tích tự động chuẩn hóa dựa trên tốc độ xử lý câu và độ chính xác từng Part.</span>
          </div>
        </div>

        {/* 1.2 DỰ PHÓNG ĐIỂM SỐ & GEMINI AI COACH (4 CỘT - THIẾT KẾ CHUẨN ĐỒNG BỘ) */}
        <div className="lg:col-span-4 p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex flex-col justify-between space-y-3.5">
          {/* Header */}
          <div className="flex items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center border border-amber-200/80 dark:border-amber-900/50 shadow-2xs shrink-0">
                <Brain className="w-5 h-5" strokeWidth={2} />
              </div>
              <div>
                <div className="text-[11px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider font-sans">
                  Mục Tiêu Ôn Luyện
                </div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-display">
                  Dự Phóng Điểm Số
                </h3>
              </div>
            </div>

            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-900/50 text-xs font-mono font-bold shadow-2xs shrink-0 whitespace-nowrap">
              <Zap className="w-3.5 h-3.5 fill-amber-500 text-amber-600" />
              <span>+200 ~ +260đ</span>
            </div>
          </div>

          {/* So sánh điểm số Hiện tại vs Mục tiêu (Chống Gãy Dòng Tuyệt Đối) */}
          <div className="grid grid-cols-2 gap-2.5 items-stretch">
            {/* Current Score Box */}
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 text-center flex flex-col justify-between space-y-1">
              <span className="text-[10px] font-bold uppercase text-slate-400 dark:text-slate-400 tracking-wider block font-sans">
                Điểm Bài Thi Này
              </span>
              <div className="text-xl sm:text-2xl font-black font-mono text-slate-900 dark:text-white tracking-tight">
                {examResult.scaledScore}
              </div>
              <span className="text-[10.5px] font-medium text-slate-500 font-sans block">
                Đúng {examResult.accuracyPercent}%
              </span>
            </div>

            {/* Target Projected Score Box */}
            <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500/8 via-amber-500/4 to-transparent dark:from-amber-500/15 dark:via-slate-800/80 border border-amber-300/70 dark:border-amber-500/30 text-center flex flex-col justify-between space-y-1 relative overflow-hidden shadow-2xs">
              <span className="text-[10px] font-bold uppercase text-amber-700 dark:text-amber-300 tracking-wider block font-sans">
                Mục Tiêu Khả Thi
              </span>
              <div className="text-lg sm:text-xl xl:text-2xl font-black font-mono text-amber-600 dark:text-amber-400 tracking-tight whitespace-nowrap flex items-center justify-center gap-1">
                <span>{targetProjectionMin}</span>
                <span className="text-amber-400 font-sans text-sm">~</span>
                <span>{targetProjectionMax}+</span>
              </div>
              <span className="text-[10.5px] font-bold text-emerald-600 dark:text-emerald-400 font-sans block">
                ⚡ 14 ngày bứt phá
              </span>
            </div>
          </div>

          {/* 3-Step Milestone Jump Plan (Đồng Bộ Màu Xanh Emerald Tăng Trưởng) */}
          <div className="p-3 rounded-xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-700/60 space-y-2 text-xs font-sans">
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-600 dark:text-slate-300">
              <span>Lộ trình gia tăng điểm số:</span>
              <span className="text-[#0059bb] dark:text-sky-400 font-mono font-bold">+200đ Target</span>
            </div>

            <div className="space-y-1.5 text-[11px]">
              <div className="flex items-center justify-between p-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700">
                <span className="text-slate-700 dark:text-slate-300 font-medium">Chặng 1: Sửa bẫy câu sai Part 1-2</span>
                <span className="px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/70 dark:border-emerald-900/50 font-mono font-bold text-[11px]">+60đ</span>
              </div>
              <div className="flex items-center justify-between p-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700">
                <span className="text-slate-700 dark:text-slate-300 font-medium">Chặng 2: Luyện Dictation nghe chép</span>
                <span className="px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/70 dark:border-emerald-900/50 font-mono font-bold text-[11px]">+110đ</span>
              </div>
              <div className="flex items-center justify-between p-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700">
                <span className="text-slate-700 dark:text-slate-300 font-medium">Chặng 3: Ôn 50 từ vựng Flashcard SRS</span>
                <span className="px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/70 dark:border-emerald-900/50 font-mono font-bold text-[11px]">+90đ</span>
              </div>
            </div>
          </div>

          {/* Interactive AI Coach Button & Drawer (Chuẩn Primary Royal Blue) */}
          <div className="space-y-2">
            {!overallAiAdvice ? (
              <button
                type="button"
                onClick={onGetOverallAiAdvice}
                className="w-full py-2.5 px-3 rounded-xl bg-[#0059bb] hover:bg-[#004899] text-white text-xs font-bold shadow-md shadow-[#0059bb]/20 border border-sky-400/30 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98 font-sans"
              >
                <Sparkles className="w-4 h-4 fill-amber-300 text-amber-300 shrink-0" />
                <span>Nhận Lời Khuyên Chiến Lược Từ Gemini AI</span>
              </button>
            ) : overallAiAdvice.loading ? (
              <div className="p-3.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900/50 flex items-center justify-center gap-2.5 text-xs text-purple-700 dark:text-purple-300 font-sans">
                <RefreshCw className="w-4 h-4 animate-spin text-purple-600" />
                <span>Gemini AI Tutor đang phân tích toàn diện 200 câu hỏi và lộ trình tối ưu...</span>
              </div>
            ) : (
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-purple-300/80 dark:border-purple-900/60 space-y-2 text-xs font-sans shadow-2xs">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-1.5">
                  <span className="font-bold text-purple-700 dark:text-purple-300 flex items-center gap-1.5 font-display">
                    <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                    <span>Đánh Giá Từ AI Coach:</span>
                  </span>
                  <button
                    type="button"
                    onClick={onGetOverallAiAdvice}
                    className="text-xs text-[#0059bb] dark:text-sky-400 hover:underline flex items-center gap-1 cursor-pointer font-bold"
                  >
                    <RefreshCw className="w-3 h-3" /> Làm mới
                  </button>
                </div>
                <div className="text-slate-700 dark:text-slate-300 text-xs leading-relaxed whitespace-pre-line select-text max-h-36 overflow-y-auto pr-1">
                  {overallAiAdvice.content}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* TẦNG 2: 1 CỘT 2 HÀNG XẾP CHỒNG (STACKED FULL-WIDTH ROWS) */}
      <div className="space-y-5 sm:space-y-6">
        {/* 2.1 HÀNG 1: LỖ HỔNG TRỌNG ĐIỂM & BẪY ĐỀ THI (FULL WIDTH) */}
        <div className="p-5 sm:p-7 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3.5">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center border border-rose-200/80 dark:border-rose-900/50 shadow-2xs shrink-0">
                <AlertCircle className="w-6 h-6" strokeWidth={2.2} />
              </div>
              <div>
                <div className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider font-sans">
                  Trọng Tâm Cần Sửa
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-display">
                  Lỗ Hổng Trọng Điểm & Bẫy Đề Thi Cần Sửa Gấp
                </h3>
              </div>
            </div>
            <span className="px-3 py-1 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 text-xs font-mono font-bold border border-rose-200 dark:border-rose-900/50 self-start sm:self-center shadow-2xs">
              {examResult.weaknesses.length} Vấn đề trọng tâm
            </span>
          </div>

          {/* Lưới 3 Thẻ Lỗ Hổng Ngang Phủ Trọn Toàn Bộ Chiều Ngang */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
            {examResult.weaknesses.slice(0, 3).map((w, idx) => {
              const isHigh = w.priority === "HIGH";
              return (
                <div
                  key={idx}
                  className="p-4.5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 hover:border-rose-300 dark:hover:border-rose-900/50 transition-all flex flex-col justify-between space-y-3 font-sans shadow-2xs group"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="w-7 h-7 rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/40 text-xs font-black flex items-center justify-center shrink-0 font-mono">
                          P{w.partNumber || idx + 1}
                        </span>
                        <span className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm truncate font-display">
                          {w.partTitle}
                        </span>
                      </div>

                      {isHigh ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold font-sans bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800/80 shadow-2xs shrink-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse shrink-0" />
                          <span>Khẩn Cấp</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold font-sans bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/80 shadow-2xs shrink-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                          <span>Cần Lưu Ý</span>
                        </span>
                      )}
                    </div>

                    <p className="text-xs sm:text-[13px] text-slate-700 dark:text-slate-300 leading-relaxed font-sans select-text">
                      {w.issue}
                    </p>
                  </div>

                  {/* Footer Action & Stat */}
                  <div className="pt-2.5 flex items-center justify-between border-t border-slate-200/60 dark:border-slate-700/60 text-xs font-sans">
                    <span className="text-xs text-slate-500 font-medium">
                      Độ đúng:{" "}
                      <strong className="text-rose-600 dark:text-rose-400 font-mono font-bold">
                        {w.accuracyPercent || 0}%
                      </strong>{" "}
                      ({w.correctCount || 0}/{w.totalQuestions || 0} câu)
                    </span>

                    {w.partNumber && (
                      <button
                        type="button"
                        onClick={() => onNavigateToReviewPart(w.partNumber!)}
                        className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 hover:bg-[#0059bb] hover:text-white text-[#0059bb] dark:text-sky-400 text-xs font-bold border border-slate-200 dark:border-slate-700 shadow-2xs flex items-center gap-1 cursor-pointer transition-all active:scale-95 shrink-0"
                      >
                        <span>Xem câu sai Part {w.partNumber}</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2.2 HÀNG 2: ĐIỂM MẠNH & KẾ HOẠCH PHÂN BỔ THỜI GIAN (FULL WIDTH) */}
        <div className="p-5 sm:p-7 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3.5">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-200/80 dark:border-emerald-900/50 shadow-2xs shrink-0">
                <CheckCircle2 className="w-6 h-6" strokeWidth={2.2} />
              </div>
              <div>
                <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider font-sans">
                  Phát Huy Lợi Thế
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-display">
                  Điểm Mạnh Đã Làm Chủ & Phân Bổ Thời Gian 14 Ngày
                </h3>
              </div>
            </div>
            <span className="px-3 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-mono font-bold border border-emerald-200 dark:border-emerald-900/50 self-start sm:self-center shadow-2xs">
              {examResult.strengths.length} Điểm mạnh
            </span>
          </div>

          {/* 2 Cột Nội Dung Bên Trong Khối Full-Width */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch pt-1">
            {/* Cột Trái (lg:col-span-7): Danh sách các điểm mạnh */}
            <div className="lg:col-span-7 space-y-2.5">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider font-sans">
                Kỹ năng và thói quen làm bài xuất sắc:
              </div>
              {examResult.strengths.map((s, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/70 dark:border-emerald-900/40 text-xs sm:text-[13px] font-medium text-emerald-950 dark:text-emerald-200 flex items-start gap-2.5 font-sans shadow-2xs"
                >
                  <span className="w-5 h-5 rounded-lg bg-emerald-600 text-white font-black flex items-center justify-center shrink-0 text-xs shadow-2xs mt-0.5">
                    ✓
                  </span>
                  <span className="leading-relaxed select-text">{s}</span>
                </div>
              ))}
            </div>

            {/* Cột Phải (lg:col-span-5): Khung phân bổ thời lượng ôn luyện 45p */}
            <div className="lg:col-span-5 p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/70 dark:border-blue-900/50 flex flex-col justify-between space-y-3 text-xs font-sans">
              <div className="flex items-center gap-2 text-[#0059bb] dark:text-sky-400 font-bold text-xs sm:text-sm">
                <Award className="w-4.5 h-4.5 shrink-0" />
                <span>Khung Thời Lượng Ôn Luyện Mỗi Ngày (45 Phút):</span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-blue-200/60 dark:border-blue-900/50 shadow-2xs">
                  <span className="font-mono font-bold text-[#0059bb] dark:text-sky-400 text-sm sm:text-base block">20p</span>
                  <span className="text-[11px] text-slate-500 font-medium">Dictation</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-blue-200/60 dark:border-blue-900/50 shadow-2xs">
                  <span className="font-mono font-bold text-purple-600 dark:text-purple-400 text-sm sm:text-base block">15p</span>
                  <span className="text-[11px] text-slate-500 font-medium">Sửa Bẫy Đề</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-blue-200/60 dark:border-blue-900/50 shadow-2xs">
                  <span className="font-mono font-bold text-amber-600 dark:text-amber-400 text-sm sm:text-base block">10p</span>
                  <span className="text-[11px] text-slate-500 font-medium">Flashcard SRS</span>
                </div>
              </div>

              <div className="text-[11.5px] text-slate-500 font-sans">
                💡 Tuân thủ đều đặn 45 phút mỗi ngày theo lịch trình này sẽ tối ưu hóa trí nhớ dài hạn và cải thiện nhanh nhất.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* TẦNG 3: LỘ TRÌNH HÀNH ĐỘNG 3 CHẶNG CÁ NHÂN HÓA (FULL WIDTH) */}
      {/* ========================================================= */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3.5">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#0059bb] text-white flex items-center justify-center shadow-2xs shrink-0">
              <Layers className="w-5 h-5" strokeWidth={2} />
            </div>
            <div>
              <div className="text-xs font-bold text-[#0059bb] dark:text-sky-400 uppercase tracking-wider font-sans">
                Hành Động Cụ Thể
              </div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-display">
                Lộ Trình 3 Chặng Hành Động Bứt Phá Điểm Số
              </h3>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-[#0059bb] dark:text-sky-400 text-xs font-bold border border-slate-200 dark:border-slate-700 shadow-2xs font-sans self-start sm:self-center">
            <Clock className="w-3.5 h-3.5" />
            <span>Lộ trình 14 ngày</span>
          </span>
        </div>

        {/* 3 Unified Milestone Cards with Direct CTAs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          {/* Stage 1 Card */}
          <div className="p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 shadow-2xs flex flex-col justify-between space-y-4 hover:border-[#0059bb] dark:hover:border-sky-400 transition-all group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-xl bg-[#0059bb] text-white text-xs font-black font-mono flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                    1
                  </span>
                  <div>
                    <span className="text-[11px] font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider block font-sans">
                      Chặng 1 • Ngày 1-3
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white font-display">
                      Giải Mã Bẫy Câu Sai
                    </h4>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-md bg-rose-500/15 text-rose-600 dark:text-rose-400 text-xs font-bold font-sans">
                  Ưu tiên #1
                </span>
              </div>
              <p className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                {examResult.recommendations[0] || "Đọc kỹ mục Lời Giải Chuyên Sâu ở Tab 2 để giải mã bẫy đề thi và từ vựng cốt lõi."}
              </p>
            </div>

            <button
              type="button"
              onClick={onNavigateToReview}
              className="w-full py-2.5 px-3 rounded-xl bg-[#0059bb] hover:bg-[#004799] text-white text-xs font-bold shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer font-sans transition-all active:scale-95"
            >
              <BookOpen className="w-4 h-4" />
              <span>Xem Lời Giải Tab 2</span>
            </button>
          </div>

          {/* Stage 2 Card */}
          <div className="p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 shadow-2xs flex flex-col justify-between space-y-4 hover:border-emerald-500 dark:hover:border-emerald-400 transition-all group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-xl bg-emerald-600 text-white text-xs font-black font-mono flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                    2
                  </span>
                  <div>
                    <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block font-sans">
                      Chặng 2 • Ngày 4-8
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white font-display">
                      Luyện Dictation Nghe
                    </h4>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold font-mono">
                  +50 XP
                </span>
              </div>
              <p className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                {examResult.recommendations[1] || "Luyện thêm tính năng Dictation Nghe Chép Chính Tả để cải thiện phản xạ âm thanh cho Part 1-4."}
              </p>
            </div>

            <Link
              href="/study/listening"
              className="w-full py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-emerald-600 hover:text-white text-slate-800 dark:text-slate-200 text-xs font-bold shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer font-sans transition-all active:scale-95 text-center"
            >
              <Headphones className="w-4 h-4" />
              <span>Vào Phòng Dictation</span>
            </Link>
          </div>

          {/* Stage 3 Card */}
          <div className="p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 shadow-2xs flex flex-col justify-between space-y-4 hover:border-amber-500 dark:hover:border-amber-400 transition-all group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 text-xs font-black font-mono flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                    3
                  </span>
                  <div>
                    <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider block font-sans">
                      Chặng 3 • Ngày 9-14
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white font-display">
                      Ôn Trí Nhớ Từ Vựng SRS
                    </h4>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-700 dark:text-amber-300 text-xs font-bold font-mono">
                  +30 Vàng
                </span>
              </div>
              <p className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                {examResult.recommendations[2] || "Ôn tập từ vựng Flashcard Spaced Repetition để mở rộng vốn từ thương mại và học thuật."}
              </p>
            </div>

            <Link
              href="/study/practice"
              className="w-full py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-amber-500 hover:text-slate-950 text-slate-800 dark:text-slate-200 text-xs font-bold shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer font-sans transition-all active:scale-95 text-center"
            >
              <Bookmark className="w-4 h-4" />
              <span>Ôn Flashcard SRS</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
