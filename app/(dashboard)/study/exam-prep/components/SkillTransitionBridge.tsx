"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, ArrowRight, Clock } from "lucide-react";
import { SkillType } from "@/features/exam-prep";

interface SkillTransitionBridgeProps {
  completedSkill: SkillType;
  nextSkill: SkillType;
  onProceed: () => void;
}

export function SkillTransitionBridge({
  completedSkill,
  nextSkill,
  onProceed
}: SkillTransitionBridgeProps) {
  const [restSeconds, setRestSeconds] = useState<number>(30);

  useEffect(() => {
    if (restSeconds <= 0) {
      onProceed();
      return;
    }

    const timer = setInterval(() => {
      setRestSeconds((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [restSeconds, onProceed]);

  const skillNames: Record<SkillType, string> = {
    LISTENING: "Nghe • Listening",
    READING: "Đọc • Reading",
    SPEAKING: "Nói AI • Speaking",
    WRITING: "Viết AI • Writing"
  };

  return (
    <div className="max-w-xl mx-auto my-4 sm:my-12 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xl text-center space-y-4 sm:space-y-5">
      <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center font-black shadow-xs">
        <Sparkles className="w-7 h-7" />
      </div>

      <div className="space-y-2">
        <span className="px-3 py-1 rounded-md text-xs font-black uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 font-mono">
          ĐÃ HOÀN THÀNH {skillNames[completedSkill]}
        </span>
        <h2 className="text-lg sm:text-2xl font-black font-display text-slate-900 dark:text-white pt-2 leading-tight">
          Chuẩn bị bước vào phần thi {skillNames[nextSkill]}
        </h2>
        <p className="text-xs sm:text-[13px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
          Hãy dành ít giây nghỉ ngơi để thả lỏng tinh thần trước khi bắt đầu phần thi tiếp theo.
        </p>
      </div>

      {/* Rest Countdown */}
      <div className="py-2">
        <div className="text-3xl sm:text-4xl font-black font-mono text-[#0059bb] dark:text-sky-400">
          {restSeconds}s
        </div>
        <span className="text-[11px] text-slate-400 font-medium flex items-center justify-center gap-1 mt-1 font-sans">
          <Clock className="w-3.5 h-3.5" /> Tự động chuyển phần thi khi hết giờ đếm ngược
        </span>
      </div>

      <button
        type="button"
        onClick={onProceed}
        className="w-full py-3.5 rounded-xl bg-[#0059bb] hover:bg-[#004899] active:scale-98 text-white text-xs sm:text-sm font-black transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer font-display"
      >
        <span>Bắt Đầu Phần Thi {skillNames[nextSkill]} Ngay</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
