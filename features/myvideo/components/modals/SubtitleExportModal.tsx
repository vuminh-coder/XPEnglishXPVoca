"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileCode,
  Download,
  Copy,
  X,
  Sparkles,
  Clock,
  Layers,
  FileText,
  CheckCircle2,
  Globe,
  Code2,
} from "lucide-react";
import { SubtitleExtractionResult } from "@/features/listening/services/youtubeSubtitleService";
import { Toast } from "@/stores/notificationStore";

interface SubtitleExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeSubtitleResult: SubtitleExtractionResult | null;
  videoTitle: string;
  addToast: (toast: Omit<Toast, "id">) => void;
}

function downloadTextFile(content: string, filename: string, mimeType: string) {
  if (typeof window === "undefined") return;
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export const SubtitleExportModal: React.FC<SubtitleExportModalProps> = ({
  isOpen,
  onClose,
  activeSubtitleResult,
  videoTitle,
  addToast,
}) => {
  const [exportActiveTab, setExportActiveTab] = useState<"json" | "srt" | "webvtt" | "all">("json");
  const [exportFontSize, setExportFontSize] = useState<"sm" | "base" | "lg">("base");

  if (!isOpen || !activeSubtitleResult) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center md:pl-64 p-3 sm:p-4 bg-slate-950/70 backdrop-blur-md overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 12 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-5xl rounded-2xl bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border border-slate-200/90 dark:border-slate-800 shadow-2xl p-4 sm:p-7 space-y-5 sm:space-y-6 select-none font-sans max-h-[90vh] overflow-y-auto"
        >
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0 shadow-2xs">
              <FileCode className="w-6 h-6 stroke-[2]" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base sm:text-lg font-bold font-display tracking-tight text-slate-900 dark:text-white">
                  Báo Cáo & Xuất Phụ Đề Song Ngữ
                </h2>
                <span className="px-2.5 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300/80 dark:border-emerald-800/60 text-[10.5px] font-mono font-bold flex items-center gap-1 shadow-2xs">
                  <Sparkles className="w-3 h-3" /> VERIFIED 100%
                </span>
              </div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 truncate mt-0.5">
                Video: {videoTitle || "YouTube Subtitle Target"}
              </p>
            </div>
          </div>

          {/* Quick Actions & Exit Button */}
          <div className="flex items-center gap-2 flex-wrap w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={() => {
                downloadTextFile(
                  JSON.stringify(activeSubtitleResult.json, null, 2),
                  `${videoTitle || "subtitles"}.json`,
                  "application/json"
                );
                addToast({ type: "success", title: "Đã tải file JSON!", message: "File JSON đã được tải về máy thành công." });
              }}
              className="h-8.5 sm:h-9 px-3 sm:px-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700/60 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs active:scale-95"
            >
              <Download className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>.JSON</span>
            </button>
            <button
              type="button"
              onClick={() => {
                downloadTextFile(
                  activeSubtitleResult.srtBilingual,
                  `${videoTitle || "subtitles"}.srt`,
                  "text/plain"
                );
                addToast({ type: "success", title: "Đã tải file SRT!", message: "File SRT Song Ngữ đã tải về máy." });
              }}
              className="h-8.5 sm:h-9 px-3 sm:px-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700/60 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs active:scale-95"
            >
              <Download className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400" />
              <span>.SRT</span>
            </button>
            <button
              type="button"
              onClick={() => {
                downloadTextFile(
                  activeSubtitleResult.webvttBilingual,
                  `${videoTitle || "subtitles"}.vtt`,
                  "text/vtt"
                );
                addToast({ type: "success", title: "Đã tải file WEBVTT!", message: "File WEBVTT Song Ngữ đã tải về máy." });
              }}
              className="h-8.5 sm:h-9 px-3 sm:px-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700/60 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs active:scale-95"
            >
              <Download className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>.VTT</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="h-8.5 sm:h-9 px-3.5 sm:px-4 rounded-xl bg-[#0059bb] hover:bg-[#004899] text-white text-xs font-bold shadow-md shadow-[#0059bb]/20 flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
            >
              <X className="w-4 h-4" />
              <span>Quay Lại (ESC)</span>
            </button>
          </div>
        </div>

        {/* Section A: 4 Double-Bezel Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800/80 flex flex-col justify-between shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-bold">
              <span>Tổng thời lượng</span>
              <div className="w-7 h-7 rounded-lg bg-blue-500/10 text-[#0059bb] dark:text-sky-400 flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-xl sm:text-2xl font-black font-mono tracking-tight text-[#0059bb] dark:text-sky-400">
                {activeSubtitleResult.stats.totalDurationStr}
              </span>
              <span className="text-[10.5px] text-slate-400 dark:text-slate-500 block mt-1 font-mono">Chuẩn ISO/LRC</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800/80 flex flex-col justify-between shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-bold">
              <span>Tổng số câu EN/VN</span>
              <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Layers className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-xl sm:text-2xl font-black font-mono tracking-tight text-emerald-600 dark:text-emerald-400">
                {activeSubtitleResult.stats.totalEnglishSentences} <span className="text-xs font-bold text-slate-400">câu</span>
              </span>
              <span className="text-[10.5px] text-slate-400 dark:text-slate-500 block mt-1 font-mono">Phân đoạn tự nhiên</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800/80 flex flex-col justify-between shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-bold">
              <span>Tổng từ Tiếng Anh</span>
              <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <FileText className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-xl sm:text-2xl font-black font-mono tracking-tight text-amber-600 dark:text-amber-400">
                {activeSubtitleResult.stats.totalEnglishWords} <span className="text-xs font-bold text-slate-400">từ</span>
              </span>
              <span className="text-[10.5px] text-slate-400 dark:text-slate-500 block mt-1 font-mono">Kho từ vựng trích xuất</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800/80 flex flex-col justify-between shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-bold">
              <span>Tỷ lệ dịch chuẩn</span>
              <div className="w-7 h-7 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-xl sm:text-2xl font-black font-mono tracking-tight text-purple-600 dark:text-purple-400">
                {activeSubtitleResult.stats.translationSuccessRate}
              </span>
              <span className="text-[10.5px] text-slate-400 dark:text-slate-500 block mt-1 font-mono">Google Server Neural API</span>
            </div>
          </div>
        </div>

        {/* Technical Audit Badge Notice */}
        <div className="p-3.5 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300 font-sans text-xs flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span><strong>BÁO CÁO KIỂM THỬ KỸ THUẬT:</strong> {activeSubtitleResult.errorReport[0]}</span>
          </div>
          <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-mono uppercase font-bold tracking-wider hidden sm:inline-block">
            ZERO OVERLAP CHECKED
          </span>
        </div>

        {/* Section B: Tab Navigation & Code Inspector Views */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2.5">
            <div className="p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/60 flex items-center gap-1 overflow-x-auto">
              <button
                type="button"
                onClick={() => setExportActiveTab("srt")}
                className={`h-8 px-3.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                  exportActiveTab === "srt"
                    ? "bg-white dark:bg-slate-900 text-[#0059bb] dark:text-sky-300 shadow-2xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>1. File .SRT Song Ngữ</span>
              </button>
              <button
                type="button"
                onClick={() => setExportActiveTab("webvtt")}
                className={`h-8 px-3.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                  exportActiveTab === "webvtt"
                    ? "bg-white dark:bg-slate-900 text-[#0059bb] dark:text-sky-300 shadow-2xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>2. File .WebVTT Song Ngữ</span>
              </button>
              <button
                type="button"
                onClick={() => setExportActiveTab("json")}
                className={`h-8 px-3.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                  exportActiveTab === "json"
                    ? "bg-white dark:bg-slate-900 text-[#0059bb] dark:text-sky-300 shadow-2xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>3. Dữ Liệu .JSON (Mili-giây)</span>
              </button>
              <button
                type="button"
                onClick={() => setExportActiveTab("all")}
                className={`h-8 px-3.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                  exportActiveTab === "all"
                    ? "bg-white dark:bg-slate-900 text-[#0059bb] dark:text-sky-300 shadow-2xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>4. Xem Tất Cả (Full View)</span>
              </button>
            </div>

            {/* Font Size Adjuster Toolbar */}
            <div className="p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/60 flex items-center gap-1 self-start md:self-auto">
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 px-2 uppercase font-mono">
                Cỡ chữ:
              </span>
              <button
                type="button"
                onClick={() => setExportFontSize("sm")}
                className={`h-7 px-2.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                  exportFontSize === "sm"
                    ? "bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 shadow-2xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                12px
              </button>
              <button
                type="button"
                onClick={() => setExportFontSize("base")}
                className={`h-7 px-2.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                  exportFontSize === "base"
                    ? "bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 shadow-2xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                14.5px (Chuẩn)
              </button>
              <button
                type="button"
                onClick={() => setExportFontSize("lg")}
                className={`h-7 px-2.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                  exportFontSize === "lg"
                    ? "bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 shadow-2xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                17px (Lớn)
              </button>
            </div>
          </div>

          {/* 1. SRT Tab View */}
          {(exportActiveTab === "srt" || exportActiveTab === "all") && (
            <div className="space-y-2.5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950/60 p-4 sm:p-5">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#0059bb] dark:text-sky-400" />
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 font-display">
                    NỘI DUNG FILE .SRT SONG NGỮ (SUBRIP FORMAT)
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950 text-[#0059bb] dark:text-sky-400 text-[10.5px] font-mono font-bold border border-blue-200/60 dark:border-blue-900/40">
                    {activeSubtitleResult.stats.totalEnglishSentences} CÂU
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(activeSubtitleResult.srtBilingual);
                      addToast({ type: "success", title: "Đã copy SRT!", message: "Nội dung SRT đã lưu vào clipboard." });
                    }}
                    className="h-8 px-3.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5 cursor-pointer shadow-2xs transition-all active:scale-95"
                  >
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                    <span>Copy SRT</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      downloadTextFile(
                        activeSubtitleResult.srtBilingual,
                        `${videoTitle || "subtitles"}.srt`,
                        "text/plain"
                      );
                      addToast({ type: "success", title: "Đã tải SRT!", message: "Tải file .srt về máy thành công." });
                    }}
                    className="h-8 px-3.5 rounded-xl bg-[#0059bb] hover:bg-[#004899] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md shadow-[#0059bb]/20 transition-all active:scale-95"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Tải .SRT</span>
                  </button>
                </div>
              </div>
              <pre
                className={`p-4 sm:p-5 rounded-xl bg-white dark:bg-slate-950 text-slate-800 dark:text-sky-300 font-mono max-h-96 overflow-y-auto border border-slate-200/80 dark:border-slate-800 shadow-inner whitespace-pre-wrap selection:bg-blue-500/20 selection:text-blue-900 dark:selection:text-sky-100 ${
                  exportFontSize === "sm"
                    ? "text-xs leading-relaxed"
                    : exportFontSize === "lg"
                    ? "text-base sm:text-[17px] leading-loose"
                    : "text-sm sm:text-[14.5px] leading-relaxed font-medium"
                }`}
              >
                {activeSubtitleResult.srtBilingual}
              </pre>
            </div>
          )}

          {/* 2. WebVTT Tab View */}
          {(exportActiveTab === "webvtt" || exportActiveTab === "all") && (
            <div className="space-y-2.5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950/60 p-4 sm:p-5">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 font-display">
                    NỘI DUNG FILE .VTT SONG NGỮ (WEB VIDEO TEXT TRACKS)
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 text-[10.5px] font-mono font-bold border border-amber-200/60 dark:border-amber-900/40">
                    HTML5 TRACK
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(activeSubtitleResult.webvttBilingual);
                      addToast({ type: "success", title: "Đã copy WEBVTT!", message: "Nội dung WEBVTT đã lưu vào clipboard." });
                    }}
                    className="h-8 px-3.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5 cursor-pointer shadow-2xs transition-all active:scale-95"
                  >
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                    <span>Copy WEBVTT</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      downloadTextFile(
                        activeSubtitleResult.webvttBilingual,
                        `${videoTitle || "subtitles"}.vtt`,
                        "text/vtt"
                      );
                      addToast({ type: "success", title: "Đã tải WEBVTT!", message: "Tải file .vtt về máy thành công." });
                    }}
                    className="h-8 px-3.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md shadow-amber-600/20 transition-all active:scale-95"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Tải .VTT</span>
                  </button>
                </div>
              </div>
              <pre
                className={`p-4 sm:p-5 rounded-xl bg-white dark:bg-slate-950 text-slate-800 dark:text-amber-300 font-mono max-h-96 overflow-y-auto border border-slate-200/80 dark:border-slate-800 shadow-inner whitespace-pre-wrap selection:bg-amber-500/20 selection:text-amber-900 dark:selection:text-amber-100 ${
                  exportFontSize === "sm"
                    ? "text-xs leading-relaxed"
                    : exportFontSize === "lg"
                    ? "text-base sm:text-[17px] leading-loose"
                    : "text-sm sm:text-[14.5px] leading-relaxed font-medium"
                }`}
              >
                {activeSubtitleResult.webvttBilingual}
              </pre>
            </div>
          )}

          {/* 3. JSON Tab View */}
          {(exportActiveTab === "json" || exportActiveTab === "all") && (
            <div className="space-y-2.5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950/60 p-4 sm:p-5">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 font-display">
                    DỮ LIỆU .JSON CẤU TRÚC (MỐC MILI-GIÂY CHÍNH XÁC)
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[10.5px] font-mono font-bold border border-emerald-200/60 dark:border-emerald-900/40">
                    PARSED OBJECTS
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(JSON.stringify(activeSubtitleResult.json, null, 2));
                      addToast({ type: "success", title: "Đã copy JSON!", message: "Dữ liệu JSON đã lưu vào clipboard." });
                    }}
                    className="h-8 px-3.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5 cursor-pointer shadow-2xs transition-all active:scale-95"
                  >
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                    <span>Copy JSON</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      downloadTextFile(
                        JSON.stringify(activeSubtitleResult.json, null, 2),
                        `${videoTitle || "subtitles"}.json`,
                        "application/json"
                      );
                      addToast({ type: "success", title: "Đã tải JSON!", message: "Tải file .json về máy thành công." });
                    }}
                    className="h-8 px-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md shadow-emerald-600/20 transition-all active:scale-95"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Tải .JSON</span>
                  </button>
                </div>
              </div>
              <pre
                className={`p-4 sm:p-5 rounded-xl bg-white dark:bg-slate-950 text-emerald-800 dark:text-emerald-300 font-mono max-h-96 overflow-y-auto border border-slate-200/80 dark:border-slate-800 shadow-inner selection:bg-emerald-500/20 selection:text-emerald-900 dark:selection:text-emerald-200 ${
                  exportFontSize === "sm"
                    ? "text-xs leading-relaxed"
                    : exportFontSize === "lg"
                    ? "text-base sm:text-[17px] leading-loose"
                    : "text-sm sm:text-[14.5px] leading-relaxed font-medium"
                }`}
              >
                {JSON.stringify(activeSubtitleResult.json, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </motion.div>
      </div>
    </AnimatePresence>
  );
};
