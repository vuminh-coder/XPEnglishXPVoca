"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, ArrowRight, Clock } from "lucide-react";
import { SkillType } from "@/lib/data/examPrepData";

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
    const timer = setInterval(() => {
      setRestSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onProceed();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [onProceed]);

  const skillNames: Record<SkillType, string> = {
    LISTENING: "Nghe (Listening)",
    READING: "Đọc (Reading)",
    SPEAKING: "Nói AI (Speaking)",
    WRITING: "Viết AI (Writing)"
  };

  return (
    <div className="max-w-xl mx-auto my-12 p-6 sm:p-8 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xl text-center space-y-5">
      <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-500 mx-auto flex items-center justify-center font-black">
        <Sparkles className="w-6 h-6" />
      </div>

      <div className="space-y-1">
        <span className="px-3 py-1 rounded-xs text-xs font-black uppercase tracking-wider bg-emerald-500 text-white font-display">
          ĐÃ HOÀN THÀNH {skillNames[completedSkill]}
        </span>
        <h2 className="text-lg sm:text-xl font-black font-display text-slate-900 dark:text-white pt-2">
          Chuẩn bị bước vào phần thi {skillNames[nextSkill]}
        </h2>
        <p className="text-xs text-slate-500">
          Hãy dành ít giây nghỉ ngơi để thả lỏng tinh thần trước khi bắt đầu phần thi tiếp theo.
        </p>
      </div>

      {/* Rest Countdown */}
      <div className="py-2">
        <div className="text-4xl font-black font-display text-[#0059bb]">
          {restSeconds}s
        </div>
        <span className="text-[11px] text-slate-400 font-medium flex items-center justify-center gap-1 mt-1 font-sans">
          <Clock className="w-3.5 h-3.5" /> Tự động chuyển phần thi khi hết giờ đếm ngược
        </span>
      </div>

      <button
        onClick={onProceed}
        className="w-full py-3 rounded-xs bg-[#0059bb] hover:bg-[#004799] text-white text-xs font-black transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer font-display"
      >
        <span>Bắt Đầu Phần Thi {skillNames[nextSkill]} Ngay</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
