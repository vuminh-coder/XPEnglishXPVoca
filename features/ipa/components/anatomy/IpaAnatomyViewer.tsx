"use client";

import React, { useState } from "react";
import { Layers, Tag, Volume2, Wind } from "lucide-react";
import { IpaSound } from "../../data/ipaData";
import { IpaSagittalCrossSection } from "./IpaSagittalCrossSection";
import { IpaFrontalLipShape } from "./IpaFrontalLipShape";

export type AnatomyViewMode = "sagittal" | "frontal";

export interface IpaAnatomyViewerProps {
  sound: IpaSound;
  defaultView?: AnatomyViewMode;
  showCapsules?: boolean;
  className?: string;
}

export const IpaAnatomyViewer: React.FC<IpaAnatomyViewerProps> = ({
  sound,
  defaultView = "sagittal",
  showCapsules = false,
  className = "",
}) => {
  const [viewMode, setViewMode] = useState<AnatomyViewMode>(defaultView);
  const [showPins, setShowPins] = useState<boolean>(true);

  const isVoiced = sound.voicing === "voiced";
  const isNasal =
    sound.airflowManner.toLowerCase().includes("mũi") ||
    sound.id === "c_m" ||
    sound.id === "c_n" ||
    sound.id === "c_ng";

  return (
    <div className={`flex flex-col space-y-3.5 select-none ${className}`}>
      {/* ──────────────────────────────────────────────────────── */}
      {/* 1. TOP DUAL-VIEW CONTROLLER & SYMBOL BANNER              */}
      {/* ──────────────────────────────────────────────────────── */}
      {/* Tier 1: Identity & Sound Symbol Banner (Unconstrained Full Width) */}
      <div className="flex items-center justify-between gap-3 px-0.5">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-400 font-bold border border-blue-100 dark:border-blue-900/60 shadow-xs shrink-0">
            <Layers className="w-4 h-4" />
          </span>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 whitespace-nowrap">
                Mô Hình Khẩu Hình 3D
              </h4>
              <span className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/80 text-[#0059bb] dark:text-sky-300 text-xs font-mono font-bold border border-blue-200/60 dark:border-blue-800/60 shrink-0">
                /{sound.symbol}/
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">
              Chuẩn giải phẫu ngữ âm học quốc tế IPA
            </p>
          </div>
        </div>
      </div>

      {/* Tier 2: Dedicated Control Toolbar Strip */}
      <div className="flex items-center justify-between gap-2 px-0.5 pt-0.5">
        <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
          {viewMode === "sagittal" ? "Sơ đồ giải phẫu cắt dọc" : "Khẩu hình trực diện môi"}
        </div>

        {/* View Switcher Segmented Control & Labels Toggle */}
        <div className="flex items-center gap-2 shrink-0">
          {viewMode === "sagittal" && (
            <button
              type="button"
              onClick={() => setShowPins(!showPins)}
              title="Bật/Tắt nhãn tên giải phẫu từng bộ phận"
              className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 shadow-2xs border cursor-pointer ${
                showPins
                  ? "bg-blue-50 dark:bg-blue-950/80 text-[#0059bb] dark:text-sky-300 border-blue-200/80 dark:border-blue-800/80"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200/80 dark:border-slate-700/80 hover:text-slate-800 dark:hover:text-slate-200"
              }`}
            >
              <Tag className="w-3.5 h-3.5 shrink-0" />
              <span>Chú thích</span>
            </button>
          )}

          <div className="inline-flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-xs">
            <button
              type="button"
              onClick={() => setViewMode("sagittal")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
                viewMode === "sagittal"
                  ? "bg-white dark:bg-slate-900 text-[#0059bb] dark:text-sky-400 shadow-sm border border-slate-200/80 dark:border-slate-700"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
              }`}
            >
              Mặt Nghiêng
            </button>

            <button
              type="button"
              onClick={() => setViewMode("frontal")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
                viewMode === "frontal"
                  ? "bg-white dark:bg-slate-900 text-[#0059bb] dark:text-sky-400 shadow-sm border border-slate-200/80 dark:border-slate-700"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
              }`}
            >
              Mặt Trước
            </button>
          </div>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────── */}
      {/* 2. DYNAMIC ANATOMICAL CANVAS                             */}
      {/* ──────────────────────────────────────────────────────── */}
      <div className="relative group">
        {viewMode === "sagittal" ? (
          <IpaSagittalCrossSection sound={sound} showPins={showPins} />
        ) : (
          <IpaFrontalLipShape sound={sound} />
        )}
      </div>

      {/* ──────────────────────────────────────────────────────── */}
      {/* 3. SCIENTIFIC ARTICULATION CAPSULES (CONDITIONAL)        */}
      {/* ──────────────────────────────────────────────────────── */}
      {showCapsules && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
          {/* Lips */}
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
            <span className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
              Khẩu hình môi
            </span>
            <span className="text-xs font-medium text-slate-800 dark:text-slate-200 line-clamp-1 mt-0.5">
              {sound.mouthShape}
            </span>
          </div>

          {/* Tongue */}
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
            <span className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
              Vị trí lưỡi
            </span>
            <span className="text-xs font-medium text-slate-800 dark:text-slate-200 line-clamp-1 mt-0.5">
              {sound.tonguePosition}
            </span>
          </div>

          {/* Voicing */}
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
            <span className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Volume2 className="w-3 h-3 text-slate-400" />
              Dây thanh
            </span>
            <span className={`text-xs font-medium line-clamp-1 mt-0.5 ${
              isVoiced ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400"
            }`}>
              {isVoiced ? "Rung (Hữu thanh)" : "Không rung (Vô thanh)"}
            </span>
          </div>

          {/* Airflow */}
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
            <span className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Wind className="w-3 h-3 text-slate-400" />
              Đường khí
            </span>
            <span className={`text-xs font-medium line-clamp-1 mt-0.5 ${
              isNasal ? "text-purple-600 dark:text-purple-400" : "text-blue-600 dark:text-blue-400"
            }`}>
              {isNasal ? "Qua mũi (Nasal)" : "Qua miệng (Oral)"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
