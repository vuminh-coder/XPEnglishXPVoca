"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Users,
  Trophy,
  Clock,
  Award,
  TrendingUp,
  CheckCircle2,
  Plus,
} from "lucide-react";
import { UserAvatar } from "@/shared/components/feedback/UserAvatar";
import { ShimmerBox, ShimmerCircle } from "@/shared/components/feedback/ShimmerSkeleton";

interface GroupDetailModalProps {
  groupId: string | null;
  onClose: () => void;
  onJoinToggle: (id: string) => void;
  isJoined?: boolean;
}

export const GroupDetailModal: React.FC<GroupDetailModalProps> = ({
  groupId,
  onClose,
  onJoinToggle,
  isJoined = false,
}) => {
  const [loading, setLoading] = useState(true);
  const [criterion, setCriterion] = useState<"time" | "xp">("time");
  const [statsData, setStatsData] = useState<any>(null);

  useEffect(() => {
    if (!groupId) return;

    let isMounted = true;
    setLoading(true);

    fetch(`/api/groups/${groupId}/stats?criterion=${criterion}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data && isMounted) {
          setStatsData(json.data);
        }
      })
      .catch((err) => console.error("Error loading group stats:", err))
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [groupId, criterion]);

  if (!groupId) return null;

  const group = statsData?.group;
  const chart = statsData?.chart;
  const leaderboard = statsData?.leaderboard || [];

  const minutesSeries: number[] = chart?.minutesSeries || [0, 0, 0, 0, 0, 0, 0];
  const maxMins = Math.max(60, Math.ceil(Math.max(...minutesSeries, 0) / 15) * 15);
  const totalMins = chart?.totalMinutes || 0;
  const bestDay = chart?.bestDayMinutes || 0;
  const avgDay = chart?.averageMinutes || 0;

  // Chart SVG coordinates
  const svgW = 600;
  const svgH = 180;
  const padLeft = 40;
  const padRight = 10;
  const baselineY = 170;
  const colWidth = (svgW - padLeft - padRight) / 7;

  const points = minutesSeries.map((val, idx) => {
    const x = padLeft + (idx + 0.5) * colWidth;
    const ratio = Math.min(1, Math.max(0, val) / maxMins);
    const y = baselineY - ratio * (baselineY - 20);
    return { x, y, val };
  });

  const fullCurvePoints = [
    { x: padLeft, y: points[0]?.y ?? baselineY },
    ...points,
    { x: svgW - padRight, y: points[points.length - 1]?.y ?? baselineY },
  ];

  let pathD = `M ${fullCurvePoints[0].x},${fullCurvePoints[0].y}`;
  for (let i = 0; i < fullCurvePoints.length - 1; i++) {
    const p0 = fullCurvePoints[i];
    const p1 = fullCurvePoints[i + 1];
    const cp1x = p0.x + (p1.x - p0.x) / 2;
    const cp1y = p0.y;
    const cp2x = p0.x + (p1.x - p0.x) / 2;
    const cp2y = p1.y;
    pathD += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p1.x},${p1.y}`;
  }
  const areaD = `${pathD} L ${svgW - padRight},${baselineY} L ${padLeft},${baselineY} Z`;

  const dayLabels = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="group-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-400 flex items-center justify-center shrink-0 shadow-2xs">
              <Users className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2
                  id="group-modal-title"
                  className="text-base sm:text-lg font-black text-slate-900 dark:text-white font-display truncate"
                >
                  {group?.name || "Chi Tiết Nhóm Học"}
                </h2>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-900/40 shrink-0">
                  {group?.themeName || "General"}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium truncate mt-0.5">
                {group?.description || "Phân tích biểu đồ phút học & bảng xếp hạng thành viên"}
              </p>
            </div>
          </div>

          <button
            type="button"
            aria-label="Đóng cửa sổ"
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 flex items-center justify-center transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5 space-y-4 max-h-[75vh] overflow-y-auto no-scrollbar">
          {loading ? (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 space-y-3">
                <ShimmerBox className="h-4 w-40 rounded" />
                <ShimmerBox className="h-32 w-full rounded-lg" />
              </div>
              <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40">
                    <div className="flex items-center gap-2">
                      <ShimmerCircle className="w-7 h-7" />
                      <ShimmerBox className="w-28 h-4 rounded" />
                    </div>
                    <ShimmerBox className="w-16 h-4 rounded" />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <>
              {/* SECTION 1: 7-DAY GROUP MINUTES CHART */}
              <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/70 dark:border-slate-800 space-y-3 shadow-2xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-[#0059bb] dark:text-sky-400 stroke-[2.2]" />
                    <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display">
                      Biểu Đồ Phút Luyện Tập Cả Nhóm (7 Ngày)
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 font-mono text-[11px]">
                    <span className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-400 font-bold border border-blue-200/60 dark:border-blue-800/40">
                      Tổng: {totalMins}m
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-200/60 dark:border-emerald-800/40">
                      Đỉnh: {bestDay}m
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold">
                      TB: {avgDay}m/ngày
                    </span>
                  </div>
                </div>

                {/* SVG Curve */}
                <div className="relative pt-1 overflow-hidden">
                  <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full h-auto overflow-visible select-none">
                    <defs>
                      <linearGradient id="groupChartGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#0059bb" stopOpacity="0.25" />
                        <stop offset="60%" stopColor="#0059bb" stopOpacity="0.08" />
                        <stop offset="100%" stopColor="#0059bb" stopOpacity="0.00" />
                      </linearGradient>
                    </defs>

                    {/* Baseline */}
                    <line
                      x1={padLeft}
                      y1={baselineY}
                      x2={svgW - padRight}
                      y2={baselineY}
                      stroke="currentColor"
                      className="text-slate-200/90 dark:text-slate-800"
                    />

                    {/* Gradient Fill */}
                    <path d={areaD} fill="url(#groupChartGrad)" />

                    {/* Curve Line */}
                    <path
                      d={pathD}
                      fill="none"
                      stroke="#0059bb"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {/* Dots and Values */}
                    {points.map((p, idx) => (
                      <g key={idx}>
                        <circle
                          cx={p.x}
                          cy={p.y}
                          r={p.val > 0 ? "3.5" : "2"}
                          className="fill-[#0059bb] dark:fill-sky-400"
                        />
                        {p.val > 0 && (
                          <text
                            x={p.x}
                            y={Math.max(14, p.y - 8)}
                            textAnchor="middle"
                            className="fill-[#0059bb] dark:fill-sky-400 font-mono text-[11px] font-black"
                          >
                            {p.val}m
                          </text>
                        )}
                      </g>
                    ))}
                  </svg>

                  {/* Day Labels */}
                  <div
                    style={{ paddingLeft: `${(padLeft / svgW) * 100}%`, paddingRight: `${(padRight / svgW) * 100}%` }}
                    className="grid grid-cols-7 text-center pt-1 border-t border-slate-100 dark:border-slate-800"
                  >
                    {dayLabels.map((lbl, i) => (
                      <span key={i} className="text-[10px] sm:text-xs font-mono font-bold text-slate-400">
                        {lbl}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* SECTION 2: GROUP LEADERBOARD */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-amber-500 stroke-[2.2]" />
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display">
                      Bảng Xếp Hạng Thành Viên ({leaderboard.length})
                    </h3>
                  </div>

                  {/* Criterion Switcher */}
                  <div className="p-0.5 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center gap-1 border border-slate-200/50 dark:border-slate-700/50">
                    <button
                      type="button"
                      onClick={() => setCriterion("time")}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-all cursor-pointer flex items-center gap-1 ${
                        criterion === "time"
                          ? "bg-white dark:bg-slate-900 text-[#0059bb] dark:text-sky-400 font-black shadow-2xs"
                          : "text-slate-500 dark:text-slate-400 font-medium"
                      }`}
                    >
                      <Clock className="w-3 h-3" />
                      <span>Phút học</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setCriterion("xp")}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-all cursor-pointer flex items-center gap-1 ${
                        criterion === "xp"
                          ? "bg-white dark:bg-slate-900 text-[#0059bb] dark:text-sky-400 font-black shadow-2xs"
                          : "text-slate-500 dark:text-slate-400 font-medium"
                      }`}
                    >
                      <Award className="w-3 h-3" />
                      <span>Điểm XP</span>
                    </button>
                  </div>
                </div>

                {/* Member Ranks */}
                <div className="space-y-2">
                  {leaderboard.map((member: any) => {
                    const isTop1 = member.rank === 1;
                    const isTop2 = member.rank === 2;
                    const isTop3 = member.rank === 3;

                    return (
                      <div
                        key={member.id}
                        className={`flex items-center justify-between p-2.5 sm:p-3 rounded-xl border transition-colors shadow-2xs ${
                          isTop1
                            ? "bg-amber-50/60 dark:bg-amber-950/30 border-amber-200/80 dark:border-amber-900/50"
                            : "bg-slate-50/80 dark:bg-slate-950/60 border-slate-200/60 dark:border-slate-800"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span
                            className={`w-5 h-5 rounded-md flex items-center justify-center font-mono text-[11px] font-black shrink-0 ${
                              isTop1
                                ? "bg-amber-400/20 text-amber-600 dark:text-amber-400 border border-amber-400/40"
                                : isTop2
                                ? "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-300"
                                : isTop3
                                ? "bg-amber-600/15 text-amber-700 dark:text-amber-500 border border-amber-600/30"
                                : "text-slate-400"
                            }`}
                          >
                            {member.rank}
                          </span>

                          <UserAvatar
                            avatar={member.avatarUrl}
                            emoji={member.avatarEmoji}
                            name={member.fullName}
                            size="w-7 h-7"
                          />

                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                                {member.fullName}
                              </span>
                              {member.role === "ADMIN" && (
                                <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                                  Trưởng nhóm
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-slate-400 font-mono">
                              Cấp {member.level} • {member.title}
                            </span>
                          </div>
                        </div>

                        <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-[#0059bb] dark:text-sky-400 shadow-2xs shrink-0">
                          {criterion === "time"
                            ? `${member.weeklyMinutes || member.minutesStudied || 0}m`
                            : `${member.weeklyXp || member.totalXp || 0} XP`}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3 bg-slate-50/50 dark:bg-slate-950/40">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Tối đa {group?.maxMembers || 50} thành viên
          </span>

          <button
            type="button"
            onClick={() => {
              if (groupId) onJoinToggle(groupId);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-2xs cursor-pointer flex items-center gap-1.5 ${
              isJoined
                ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-300/60 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-300"
                : "bg-[#0059bb] hover:bg-[#004ba0] text-white"
            }`}
          >
            {isJoined ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Đã tham gia</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Tham gia nhóm</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
