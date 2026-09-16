"use client";
import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  Copy,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Download,
  X,
  Video,
} from "lucide-react";
import { parseSrtContent, validateSrtContent } from "@/features/listening/services/srtParser";
import { SubtitleSentence, YouTubeVideoItem } from "@/stores/videoStore";
import { Toast } from "@/stores/notificationStore";

interface SrtImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeVideo: YouTubeVideoItem | null;
  onImportSuccess: (subtitles: SubtitleSentence[]) => void;
  addToast: (toast: Omit<Toast, "id">) => void;
}

function formatSubTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return "00:00";
  const totalSec = Math.floor(seconds);
  const mins = Math.floor(totalSec / 60);
  const secs = totalSec % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

export const SrtImportModal: React.FC<SrtImportModalProps> = ({
  isOpen,
  onClose,
  activeVideo,
  onImportSuccess,
  addToast,
}) => {
  const [srtImportTab, setSrtImportTab] = useState<"file" | "paste">("file");
  const [srtFileName, setSrtFileName] = useState("");
  const [srtPasteContent, setSrtPasteContent] = useState("");
  const [srtImportError, setSrtImportError] = useState<string | null>(null);
  const [srtPreviewCount, setSrtPreviewCount] = useState(0);
  const srtFileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleImportSrt = () => {
    if (!activeVideo) {
      setSrtImportError("Vui lòng chọn một video trước khi nạp phụ đề");
      return;
    }
    setSrtImportError(null);

    const validationError = validateSrtContent(srtPasteContent);
    if (validationError) {
      setSrtImportError(validationError);
      return;
    }

    const parsed = parseSrtContent(srtPasteContent, activeVideo.id);
    if (parsed.length === 0) {
      setSrtImportError("Không phân tích được phụ đề. Kiểm tra lại nội dung file .srt.");
      return;
    }

    onImportSuccess(parsed);
    onClose();
    setSrtPasteContent("");
    setSrtFileName("");
    setSrtPreviewCount(0);

    addToast({
      type: "success",
      title: `Đã tự động cập nhật ${parsed.length} câu phụ đề .SRT vào web!`,
      message: "Timeline mốc mili-giây đã xuất hiện chuẩn 100% trên giao diện bài học!",
    });
  };

  const handleSrtFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const ext = file.name.split(".").pop()?.toLowerCase();
    if (ext !== "srt" && ext !== "vtt" && ext !== "txt") {
      setSrtImportError("Chỉ hỗ trợ file .srt, .vtt hoặc .txt");
      return;
    }

    const reader = new FileReader();
    reader.onload = (ev) => {
      const content = ev.target?.result as string;
      if (content) {
        setSrtPasteContent(content);
        setSrtFileName(file.name);
        setSrtImportError(null);
        const preview = parseSrtContent(content);
        setSrtPreviewCount(preview.length);
      }
    };
    reader.readAsText(file, "UTF-8");

    if (srtFileInputRef.current) srtFileInputRef.current.value = "";
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center md:pl-64 p-3 sm:p-4 bg-slate-950/70 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-4xl bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] select-none font-sans"
        >
          {/* Modal Header */}
          <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between shrink-0 bg-white dark:bg-slate-900">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-[#0059bb]/10 text-[#0059bb] dark:text-sky-400 border border-[#0059bb]/20 flex items-center justify-center shrink-0 shadow-2xs">
                <Upload className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-base font-bold font-display text-slate-900 dark:text-white">
                    Nhập Phụ Đề Song Ngữ
                  </h3>
                  <span className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-300 text-[10px] font-mono font-bold border border-blue-200/60 dark:border-blue-800/40">
                    .SRT / .VTT / .TXT
                  </span>
                </div>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 truncate mt-0.5">
                  {activeVideo
                    ? `Áp dụng vào video: ${activeVideo.title}`
                    : "Tự động đồng bộ mốc thời gian mili-giây chuẩn xác 100%"}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-all cursor-pointer"
              title="Đóng cửa sổ"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-4 sm:p-5 space-y-4 overflow-y-auto flex-1 min-h-0">
            {/* 1. Target Video Indicator Banner */}
            {activeVideo && (
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-blue-600/10 text-[#0059bb] dark:text-sky-400 flex items-center justify-center shrink-0">
                    <Video className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Video Đích Nhận Phụ Đề
                    </span>
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                      {activeVideo.title}
                    </p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold border border-emerald-500/20 shrink-0">
                  Đang chọn
                </span>
              </div>
            )}

            {/* 2. Modern 2-Tab Switcher */}
            <div className="p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/60 grid grid-cols-2 gap-1">
              <button
                type="button"
                onClick={() => setSrtImportTab("file")}
                className={`py-2 rounded-lg text-xs font-bold font-display transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  srtImportTab === "file"
                    ? "bg-white dark:bg-slate-900 text-[#0059bb] dark:text-sky-300 shadow-2xs font-bold"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Tải File Từ Thiết Bị</span>
              </button>
              <button
                type="button"
                onClick={() => setSrtImportTab("paste")}
                className={`py-2 rounded-lg text-xs font-bold font-display transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  srtImportTab === "paste"
                    ? "bg-white dark:bg-slate-900 text-[#0059bb] dark:text-sky-300 shadow-2xs font-bold"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Dán Nội Dung SRT / VTT</span>
              </button>
            </div>

            {/* 3. Tab Content */}
            {srtImportTab === "file" ? (
              <div className="space-y-3">
                <input
                  ref={srtFileInputRef}
                  type="file"
                  accept=".srt,.vtt,.txt"
                  onChange={handleSrtFileUpload}
                  className="hidden"
                />

                {/* Drag & Drop Card */}
                <div
                  onClick={() => srtFileInputRef.current?.click()}
                  onDragOver={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const file = e.dataTransfer.files?.[0];
                    if (file) {
                      const ext = file.name.split(".").pop()?.toLowerCase();
                      if (ext === "srt" || ext === "vtt" || ext === "txt") {
                        const reader = new FileReader();
                        reader.onload = (ev) => {
                          const content = ev.target?.result as string;
                          if (content) {
                            setSrtPasteContent(content);
                            setSrtFileName(file.name);
                            setSrtImportError(null);
                            const preview = parseSrtContent(content);
                            setSrtPreviewCount(preview.length);
                          }
                        };
                        reader.readAsText(file, "UTF-8");
                      } else {
                        setSrtImportError("Chỉ hỗ trợ file có đuôi .srt, .vtt hoặc .txt");
                      }
                    }
                  }}
                  className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-[#0059bb] dark:hover:border-sky-400 bg-slate-50/60 dark:bg-slate-950/40 hover:bg-blue-50/30 dark:hover:bg-blue-950/20 rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-[#0059bb] dark:text-sky-400 flex items-center justify-center group-hover:scale-110 transition-transform mb-3 shadow-2xs">
                    <Upload className="w-6 h-6 stroke-[2]" />
                  </div>
                  <h4 className="text-sm font-bold font-display text-slate-900 dark:text-white">
                    Kéo thả file .SRT hoặc .VTT vào đây
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm">
                    Hoặc bấm vào khung để mở trình duyệt file trên máy tính của bạn
                  </p>
                  <div className="mt-3.5 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 text-[#0059bb] dark:text-sky-300 text-xs font-bold border border-slate-200 dark:border-slate-700 shadow-2xs group-hover:bg-[#0059bb] group-hover:text-white transition-all">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Chọn File từ máy tính</span>
                  </div>
                  <span className="text-[10px] text-slate-400 mt-2 font-mono">
                    Định dạng hỗ trợ: .srt (SubRip), .vtt (WebVTT), .txt
                  </span>
                </div>

                {/* Selected File Badge */}
                {srtFileName && (
                  <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-800/60 flex items-center justify-between">
                    <div className="flex items-center gap-2 min-w-0">
                      <FileText className="w-4 h-4 text-[#0059bb] dark:text-sky-400 shrink-0" />
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                        {srtFileName}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSrtFileName("");
                        setSrtPasteContent("");
                        setSrtPreviewCount(0);
                      }}
                      className="p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="srt-textarea-input"
                    className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 font-display"
                  >
                    <FileText className="w-3.5 h-3.5 text-purple-500" />
                    Nội dung phụ đề SubRip / WebVTT
                  </label>
                  {srtPasteContent && (
                    <button
                      type="button"
                      onClick={() => {
                        setSrtPasteContent("");
                        setSrtPreviewCount(0);
                      }}
                      className="text-[11px] font-bold text-rose-500 hover:underline cursor-pointer"
                    >
                      Xóa trắng
                    </button>
                  )}
                </div>

                <textarea
                  id="srt-textarea-input"
                  value={srtPasteContent}
                  onChange={(e) => {
                    setSrtPasteContent(e.target.value);
                    setSrtImportError(null);
                    if (e.target.value.trim().length > 20) {
                      const preview = parseSrtContent(e.target.value);
                      setSrtPreviewCount(preview.length);
                    } else {
                      setSrtPreviewCount(0);
                    }
                  }}
                  placeholder={`1\n00:00:01,000 --> 00:00:04,500\nWelcome to this English lesson.\n\n2\n00:00:05,000 --> 00:00:09,200\nToday we will learn key business vocabulary.`}
                  className="w-full h-44 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/90 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 resize-none focus:ring-2 focus:ring-[#0059bb]/20 focus:border-[#0059bb] focus:outline-hidden transition-all placeholder:text-slate-400"
                  spellCheck={false}
                />
              </div>
            )}

            {/* 4. Live Parser Success & Preview Box */}
            {srtPreviewCount > 0 && (
              <div className="p-3.5 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/60 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Đã nhận diện thành công {srtPreviewCount} câu phụ đề hợp lệ!</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 text-[10px] font-mono font-bold border border-emerald-500/20">
                    Sẵn sàng nạp
                  </span>
                </div>

                {/* Preview first 2 cues */}
                <div className="space-y-1.5 pt-1">
                  {parseSrtContent(srtPasteContent)
                    .slice(0, 2)
                    .map((cue, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-lg bg-white/80 dark:bg-slate-900/80 border border-emerald-200/50 dark:border-emerald-900/40 text-[11px] font-sans flex items-start gap-2"
                      >
                        <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 shrink-0">
                          #{idx + 1}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="text-slate-800 dark:text-slate-200 font-bold truncate">
                            {cue.textEn}
                          </p>
                          <span className="text-[10px] font-mono text-slate-400">
                            {formatSubTime(cue.startTime)} ➔ {formatSubTime(cue.endTime)}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* 5. Error Alert */}
            {srtImportError && (
              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-rose-700 dark:text-rose-300 text-xs font-medium flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0" />
                <span>{srtImportError}</span>
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3 shrink-0 rounded-b-2xl">
            <button
              type="button"
              onClick={onClose}
              className="h-9 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold transition-all cursor-pointer"
            >
              Hủy Bỏ
            </button>

            <button
              type="button"
              onClick={handleImportSrt}
              disabled={srtPasteContent.trim().length < 20}
              className="h-9 px-5 rounded-xl bg-[#0059bb] hover:bg-[#004899] disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold shadow-md shadow-[#0059bb]/20 flex items-center gap-2 transition-all cursor-pointer font-display active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>
                Nạp {srtPreviewCount > 0 ? `${srtPreviewCount} Câu Phụ Đề` : "Vào Bài Học"}
              </span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
