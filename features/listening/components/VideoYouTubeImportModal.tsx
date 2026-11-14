"use client";

import React, { useState, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Video,
  Upload,
  FileText,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Globe,
  Languages,
  ArrowRight,
  Clock,
} from "lucide-react";
import { extractYouTubeVideoId } from "@/features/listening/utils/videoUrlHelper";
import {
  processHighPrecisionSubtitles,
  ExtractedTrackInfo,
  SubtitleExtractionError,
} from "@/features/listening/services/youtubeSubtitleService";
import { parseSrtContent, validateSrtContent } from "@/features/listening/services/srtParser";
import { useVideoCatalogStore } from "@/stores";
import { useNotificationStore } from "@/stores/notificationStore";
import { ShimmerBox } from "./LoadingSkeletons";
import type { SubtitleSentence } from "@/stores/videoStore";

interface VideoYouTubeImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  practiceMode?: "dictation" | "shadowing";
  onImportedLesson?: (lessonId: string) => void;
}

type ImportTabMode = "youtube" | "srt" | "transcript";

const CEFR_OPTIONS = ["A1", "A2", "B1", "B2", "C1", "C2"] as const;

const CATEGORY_OPTIONS = [
  "YouTube Tuyển Chọn",
  "TED Talks & Tư Duy",
  "Giao Tiếp Thực Tế",
  "Kinh Doanh & Công Nghệ",
  "Luyện Thi IELTS / TOEIC",
  "Phim Ảnh & Kể Chuyện",
];

function formatSecShort(sec: number): string {
  const safe = Math.max(0, Math.floor(sec));
  const mins = Math.floor(safe / 60);
  const rem = safe % 60;
  return `${String(mins).padStart(2, "0")}:${String(rem).padStart(2, "0")}`;
}

export const VideoYouTubeImportModal: React.FC<VideoYouTubeImportModalProps> = ({
  isOpen,
  onClose,
  practiceMode = "dictation",
  onImportedLesson,
}) => {
  const addToast = useNotificationStore((s) => s.addToast);

  const [activeTab, setActiveTab] = useState<ImportTabMode>("youtube");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [customTitle, setCustomTitle] = useState("");
  const [cefrLevel, setCefrLevel] = useState<string>("B1");
  const [categoryName, setCategoryName] = useState<string>("YouTube Tuyển Chọn");

  // Extraction & Preview State
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusError, setStatusError] = useState<string | null>(null);
  const [failureReason, setFailureReason] = useState<string | null>(null);
  const [discoveredTracks, setDiscoveredTracks] = useState<ExtractedTrackInfo[]>([]);
  const [selectedLang, setSelectedLang] = useState<string>("");
  const [previewSubtitles, setPreviewSubtitles] = useState<SubtitleSentence[]>([]);

  // Rescue Tab 2: SRT / VTT
  const [srtContent, setSrtContent] = useState("");
  const [srtFileName, setSrtFileName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Rescue Tab 3: Raw Transcript
  const [rawTranscript, setRawTranscript] = useState("");
  const [isSavingLesson, setIsSavingLesson] = useState(false);

  const parsedVideoId = useMemo(() => extractYouTubeVideoId(youtubeUrl), [youtubeUrl]);

  if (!isOpen) return null;

  const resetModalState = () => {
    setStatusError(null);
    setFailureReason(null);
    setDiscoveredTracks([]);
    setSelectedLang("");
    setPreviewSubtitles([]);
  };

  const handleExtractYouTube = async (preferredLang?: string) => {
    if (!parsedVideoId) {
      setStatusError("Link YouTube không hợp lệ. Hỗ trợ watch?v=, youtu.be/, shorts/, hoặc live/.");
      return;
    }

    setIsProcessing(true);
    setStatusError(null);
    setFailureReason(null);

    try {
      let resolvedTitle = customTitle.trim();
      if (!resolvedTitle) {
        try {
          const oembedRes = await fetch(
            `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${parsedVideoId}&format=json`,
            { signal: AbortSignal.timeout(2200) }
          );
          if (oembedRes.ok) {
            const oData = await oembedRes.json();
            if (oData?.title) resolvedTitle = String(oData.title);
          }
        } catch {}
      }

      const result = await processHighPrecisionSubtitles(
        parsedVideoId,
        resolvedTitle || undefined,
        {
          preferredLang,
          forceRefresh: Boolean(preferredLang),
        }
      );

      if (result.metadata?.title && !customTitle.trim()) {
        setCustomTitle(result.metadata.title);
      } else if (resolvedTitle && !customTitle.trim()) {
        setCustomTitle(resolvedTitle);
      }

      if (Array.isArray(result.metadata?.tracks)) {
        setDiscoveredTracks(result.metadata.tracks);
      }
      if (result.metadata?.selectedTrack?.lang) {
        setSelectedLang(result.metadata.selectedTrack.lang);
      } else if (preferredLang) {
        setSelectedLang(preferredLang);
      }

      setPreviewSubtitles(result.storeSubtitles);
      addToast({
        type: "success",
        title: "Trích xuất phụ đề thành công",
        message: `Đã chuẩn hóa ${result.storeSubtitles.length} câu phụ đề khớp từng câu nói.`,
      });
    } catch (err: any) {
      if (err instanceof SubtitleExtractionError) {
        if (err.metadata?.title && !customTitle.trim()) {
          setCustomTitle(err.metadata.title);
        }
        if (Array.isArray(err.metadata?.tracks) && err.metadata.tracks.length > 0) {
          setDiscoveredTracks(err.metadata.tracks);
        }
        setFailureReason(err.failureReason || "NO_CAPTIONS");
        setStatusError(err.message);
      } else {
        setFailureReason("NO_CAPTIONS");
        setStatusError(
          err?.message ||
            "Không thể lấy phụ đề từ YouTube cho video này. Bạn có thể cứu dữ liệu bằng .SRT hoặc dán Transcript bên cạnh."
        );
      }
      setPreviewSubtitles([]);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSrtFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const ext = file.name.split(".").pop()?.toLowerCase();
    if (ext !== "srt" && ext !== "vtt" && ext !== "txt") {
      setStatusError("Chỉ hỗ trợ tệp định dạng .srt, .vtt hoặc .txt.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      const content = String(ev.target?.result || "");
      setSrtFileName(file.name);
      setSrtContent(content);
      setStatusError(null);
    };
    reader.readAsText(file, "utf-8");
  };

  const handleParseSrtRescue = () => {
    if (!parsedVideoId) {
      setStatusError("Vui lòng nhập đường dẫn YouTube hợp lệ ở phía trên trước khi nạp .SRT.");
      return;
    }
    const validationErr = validateSrtContent(srtContent);
    if (validationErr) {
      setStatusError(validationErr);
      return;
    }

    const parsed = parseSrtContent(srtContent, parsedVideoId);
    if (!parsed.length) {
      setStatusError("Không đọc được mốc thời gian hợp lệ từ nội dung .SRT / .VTT này.");
      return;
    }

    setStatusError(null);
    setFailureReason(null);
    setPreviewSubtitles(parsed);
    addToast({
      type: "success",
      title: `Đã nạp ${parsed.length} câu từ file .SRT/.VTT`,
      message: "Kiểm tra bản xem trước và nhấn Lưu & Luyện tập ngay.",
    });
  };

  const handleAlignRawTranscript = async () => {
    if (!parsedVideoId) {
      setStatusError("Vui lòng nhập đường dẫn YouTube hợp lệ ở phía trên trước.");
      return;
    }
    if (rawTranscript.trim().length < 15) {
      setStatusError("Vui lòng dán nội dung transcript thật của video (tối thiểu 15 ký tự).");
      return;
    }

    setIsProcessing(true);
    setStatusError(null);

    try {
      const res = await fetch("/api/youtube/ai-transcribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          videoId: parsedVideoId,
          videoTitle: customTitle.trim() || `YouTube Video (${parsedVideoId})`,
          rawTranscript: rawTranscript.trim(),
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.success || !Array.isArray(json.subtitles)) {
        throw new Error(json?.error || "Không thể căn chỉnh transcript thành phụ đề.");
      }

      const mapped: SubtitleSentence[] = json.subtitles.map((sub: any, idx: number) => {
        const startSec = Number.isFinite(Number(sub.startSeconds)) ? Number(sub.startSeconds) : 0;
        const dur = Number.isFinite(Number(sub.duration)) ? Number(sub.duration) : 3.2;
        return {
          id: `transcript_${parsedVideoId}_${idx + 1}`,
          startTime: startSec,
          endTime: parseFloat((startSec + dur).toFixed(3)),
          textEn: String(sub.english || "").trim(),
          textVn: String(sub.vietnamese || "").trim(),
          dictationWord: sub.dictationWord,
        };
      });

      setPreviewSubtitles(mapped);
      setFailureReason(null);
      addToast({
        type: "success",
        title: `Đã căn chỉnh ${mapped.length} câu từ Transcript thật`,
        message: "Sẵn sàng lưu bài học và bắt đầu luyện tập!",
      });
    } catch (err: any) {
      setStatusError(err?.message || "Lỗi căn chỉnh transcript.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSaveAndOpenLesson = async () => {
    if (!parsedVideoId || previewSubtitles.length === 0) return;

    setIsSavingLesson(true);
    setStatusError(null);

    try {
      const transcriptPayload = previewSubtitles.map((sub, idx) => ({
        id: idx + 1,
        text: sub.textEn,
        translation: sub.textVn || "",
        startTime: Number.isFinite(Number(sub.startTime)) ? Number(sub.startTime) : 0,
        endTime: Number.isFinite(Number(sub.endTime))
          ? Number(sub.endTime)
          : Number(sub.startTime ?? 0) + 3.5,
        wordTimings: sub.wordTimings,
      }));

      const lastEnd = transcriptPayload[transcriptPayload.length - 1]?.endTime ?? 180;
      const totalMins = Math.max(1, Math.ceil(lastEnd / 60));

      const createRes = await fetch("/api/listening/lessons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: customTitle.trim() || `YouTube Practice (${parsedVideoId})`,
          category: categoryName,
          level: cefrLevel,
          accent: "en-US",
          duration: `${totalMins} min`,
          audioUrl: `https://www.youtube.com/watch?v=${parsedVideoId}`,
          imageUrl: `https://img.youtube.com/vi/${parsedVideoId}/hqdefault.jpg`,
          transcript: transcriptPayload,
        }),
      });

      const createJson = await createRes.json();
      if (!createRes.ok || !createJson.success || !createJson.data?.id) {
        throw new Error(createJson?.error || "Không thể lưu bài học video mới.");
      }

      const createdId = createJson.data.id as string;

      // Invalidate store cache so new lesson renders inside catalog immediately
      useVideoCatalogStore.getState().invalidateCache("all");
      void useVideoCatalogStore.getState().fetchLessons({}, { forceRefresh: true });

      addToast({
        type: "success",
        title: "Đã tạo bài học Video thành công",
        message: `Đang mở ${transcriptPayload.length} câu ở chế độ ${
          practiceMode === "shadowing" ? "Shadowing" : "Dictation"
        }.`,
      });

      resetModalState();
      onClose();
      onImportedLesson?.(createdId);
    } catch (err: any) {
      setStatusError(err?.message || "Lỗi khi lưu bài học vào cơ sở dữ liệu.");
    } finally {
      setIsSavingLesson(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/80 shrink-0">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-[#0059bb] dark:text-sky-400 shrink-0">
                <Video className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h2 className="text-base font-bold text-slate-900 dark:text-white truncate">
                  Thêm Video YouTube ({practiceMode === "shadowing" ? "Shadowing" : "Dictation"})
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                  Bóc tách phụ đề tự động chuẩn câu &amp; hỗ trợ nạp cứu .SRT / Transcript thật
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Đóng cửa sổ"
              className="w-8 h-8 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Scrollable Body */}
          <div className="p-5 overflow-y-auto space-y-5 flex-1">
            {/* Direct Mode Tabs (Rule 14: direct 3-value picker, no hidden dropdown) */}
            <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700">
              {[
                { id: "youtube" as const, label: "Auto CC YouTube", icon: Globe },
                { id: "srt" as const, label: "Nhập .SRT / .VTT", icon: Upload },
                { id: "transcript" as const, label: "Dán Transcript thật", icon: FileText },
              ].map((tab) => {
                const Icon = tab.icon;
                const isSelected = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      setActiveTab(tab.id);
                      setStatusError(null);
                    }}
                    className={`py-2 px-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      isSelected
                        ? "bg-white dark:bg-slate-900 text-[#0059bb] dark:text-sky-400 shadow-2xs"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Common Fields: YouTube URL + Title + CEFR Level (Rule 3 Spacing + Rule 6 External Labels + Rule 15 Box Borders) */}
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label
                  htmlFor="video-yt-url-input"
                  className="block text-xs font-bold text-slate-700 dark:text-slate-300"
                >
                  Đường dẫn Video YouTube <span className="text-rose-500">*</span>
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    id="video-yt-url-input"
                    type="url"
                    value={youtubeUrl}
                    onChange={(e) => {
                      setYoutubeUrl(e.target.value);
                      if (previewSubtitles.length > 0) setPreviewSubtitles([]);
                      setStatusError(null);
                    }}
                    placeholder="VD: https://www.youtube.com/watch?v=..., youtu.be/..., youtube.com/shorts/..."
                    className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#0059bb]"
                  />
                  {parsedVideoId && (
                    <span className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-[11px] font-mono font-bold text-emerald-700 dark:text-emerald-300 shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      ID: {parsedVideoId}
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label
                    htmlFor="video-yt-title-input"
                    className="block text-xs font-bold text-slate-700 dark:text-slate-300"
                  >
                    Tiêu đề bài học (Tùy chọn)
                  </label>
                  <input
                    id="video-yt-title-input"
                    type="text"
                    value={customTitle}
                    onChange={(e) => setCustomTitle(e.target.value)}
                    placeholder="Tự động điền từ YouTube nếu để trống..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#0059bb]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="video-category-select"
                    className="block text-xs font-bold text-slate-700 dark:text-slate-300"
                  >
                    Chủ đề bài học
                  </label>
                  <select
                    id="video-category-select"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#0059bb]"
                  >
                    {CATEGORY_OPTIONS.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* CEFR Level Direct Chips */}
              <div className="space-y-1.5">
                <span className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Trình độ CEFR mục tiêu
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {CEFR_OPTIONS.map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setCefrLevel(lvl)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold border transition-all cursor-pointer ${
                        cefrLevel === lvl
                          ? "bg-[#0059bb] border-[#0059bb] text-white shadow-2xs"
                          : "bg-white dark:bg-slate-950 border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-[#0059bb]"
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Tab Specific Inputs */}
            {activeTab === "srt" && (
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <label
                    htmlFor="video-srt-paste-input"
                    className="text-xs font-bold text-slate-700 dark:text-slate-300"
                  >
                    Nội dung tệp phụ đề (.SRT hoặc .VTT)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".srt,.vtt,.txt"
                      onChange={handleSrtFileChange}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold text-slate-700 dark:text-slate-200 hover:border-[#0059bb] flex items-center gap-1.5 cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>{srtFileName ? `Đã chọn: ${srtFileName}` : "Tải tệp từ máy"}</span>
                    </button>
                  </div>
                </div>
                <textarea
                  id="video-srt-paste-input"
                  rows={5}
                  value={srtContent}
                  onChange={(e) => setSrtContent(e.target.value)}
                  placeholder={"1\n00:00:01,000 --> 00:00:04,500\nWelcome back to the channel.\nChào mừng bạn quay lại với kênh."}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-mono text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#0059bb]"
                />
              </div>
            )}

            {activeTab === "transcript" && (
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 space-y-2.5">
                <label
                  htmlFor="video-transcript-input"
                  className="block text-xs font-bold text-slate-700 dark:text-slate-300"
                >
                  Dán Transcript tiếng Anh thật của video (từ YouTube Description / Blog / PDF)
                </label>
                <textarea
                  id="video-transcript-input"
                  rows={5}
                  value={rawTranscript}
                  onChange={(e) => setRawTranscript(e.target.value)}
                  placeholder="Dán nguyên văn bài nói tiếng Anh tại đây. Hệ thống sẽ tách câu chuẩn xác, gắn mốc thời gian ước lượng và dịch song ngữ Anh - Việt..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#0059bb]"
                />
              </div>
            )}

            {/* Skeleton Loader while Processing (Rule 1) */}
            {isProcessing && (
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-blue-200 dark:border-blue-900/50 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-[#0059bb] dark:text-sky-400">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Đang kết nối đa tầng &amp; chuẩn hóa phụ đề từng câu...
                  </span>
                  <span className="font-mono text-[11px] text-slate-400">Đang xử lý</span>
                </div>
                <div className="space-y-2">
                  <ShimmerBox className="h-9 w-full rounded-lg" />
                  <ShimmerBox className="h-9 w-11/12 rounded-lg" />
                  <ShimmerBox className="h-9 w-4/5 rounded-lg" />
                </div>
              </div>
            )}

            {/* Diagnostic Error + Rescue Call-to-Action */}
            {statusError && (
              <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 space-y-2.5">
                <div className="flex items-start gap-2 text-xs text-rose-700 dark:text-rose-300 font-medium">
                  <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p>{statusError}</p>
                    {failureReason && (
                      <p className="text-[11px] font-mono text-rose-500 dark:text-rose-400">
                        Mã chẩn đoán: {failureReason}
                      </p>
                    )}
                  </div>
                </div>
                {activeTab === "youtube" && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab("srt");
                        setStatusError(null);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-800 text-xs font-bold text-slate-800 dark:text-slate-100 hover:border-[#0059bb] flex items-center gap-1.5 cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5 text-[#0059bb]" />
                      <span>Cứu bằng file .SRT / .VTT</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab("transcript");
                        setStatusError(null);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-800 text-xs font-bold text-slate-800 dark:text-slate-100 hover:border-purple-500 flex items-center gap-1.5 cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5 text-purple-600" />
                      <span>Cứu bằng dán Transcript</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Track Switcher when multiple CC languages exist */}
            {discoveredTracks.length > 0 && activeTab === "youtube" && (
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300">
                  <Languages className="w-3.5 h-3.5 text-[#0059bb]" />
                  <span>Chọn Track Phụ Đề ({discoveredTracks.length} luồng khả dụng):</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {discoveredTracks.map((tr) => {
                    const active = tr.lang === selectedLang;
                    return (
                      <button
                        key={`${tr.lang}_${tr.kind || "manual"}`}
                        type="button"
                        disabled={isProcessing}
                        onClick={() => handleExtractYouTube(tr.lang)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-all cursor-pointer disabled:opacity-50 ${
                          active
                            ? "bg-[#0059bb] border-[#0059bb] text-white"
                            : "bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-[#0059bb]"
                        }`}
                      >
                        {tr.languageName || tr.lang}
                        {tr.isAutoGenerated || tr.kind === "asr" ? " (ASR)" : " (Chuẩn)"}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Clean Normalized Sentence Preview */}
            {previewSubtitles.length > 0 && (
              <div className="p-3.5 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-900/50 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    Bản xem trước: {previewSubtitles.length} câu đã chuẩn hóa
                  </span>
                  <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
                    Đầu: {formatSecShort(previewSubtitles[0]?.startTime ?? 0)}
                  </span>
                </div>
                <div className="max-h-44 overflow-y-auto space-y-1.5 pr-1">
                  {previewSubtitles.slice(0, 8).map((sub, i) => (
                    <div
                      key={sub.id || i}
                      className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-xs space-y-0.5"
                    >
                      <div className="flex items-center justify-between gap-2 text-[10px] font-mono text-slate-400">
                        <span>Câu #{i + 1}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-2.5 h-2.5" />
                          {formatSecShort(sub.startTime)} → {formatSecShort(sub.endTime)}
                        </span>
                      </div>
                      <p className="font-semibold text-slate-900 dark:text-white leading-snug">
                        {sub.textEn}
                      </p>
                      {sub.textVn && (
                        <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                          {sub.textVn}
                        </p>
                      )}
                    </div>
                  ))}
                  {previewSubtitles.length > 8 && (
                    <p className="text-center text-[11px] text-slate-500 py-1">
                      ...và còn {previewSubtitles.length - 8} câu nữa trong bài học
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sticky Footer with Single Primary Action Button (Rule 13, 18, 19) */}
          <div className="px-5 py-3.5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/80 flex items-center justify-between gap-2 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 cursor-pointer"
            >
              Hủy
            </button>

            <div className="flex items-center gap-2">
              {previewSubtitles.length > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    if (activeTab === "youtube") handleExtractYouTube(selectedLang || undefined);
                    else if (activeTab === "srt") handleParseSrtRescue();
                    else handleAlignRawTranscript();
                  }}
                  disabled={isProcessing || isSavingLesson}
                  className="px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold text-slate-700 dark:text-slate-200 hover:border-[#0059bb] cursor-pointer disabled:opacity-50"
                >
                  Cập nhật lại
                </button>
              )}

              {previewSubtitles.length > 0 ? (
                <button
                  type="button"
                  onClick={handleSaveAndOpenLesson}
                  disabled={isSavingLesson}
                  className="px-4 py-2.5 rounded-xl bg-[#0059bb] hover:bg-[#004899] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer active:scale-95 transition-all disabled:opacity-50"
                >
                  <span>
                    {isSavingLesson ? "Đang lưu bài học..." : "Lưu & Luyện tập ngay"}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={() => {
                    if (activeTab === "youtube") handleExtractYouTube();
                    else if (activeTab === "srt") handleParseSrtRescue();
                    else handleAlignRawTranscript();
                  }}
                  className="px-4 py-2.5 rounded-xl bg-[#0059bb] hover:bg-[#004899] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer active:scale-95 transition-all disabled:opacity-50"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>
                    {isProcessing
                      ? "Đang xử lý..."
                      : activeTab === "youtube"
                      ? "Bóc tách phụ đề"
                      : activeTab === "srt"
                      ? "Đọc tệp .SRT / .VTT"
                      : "Căn chỉnh Transcript"}
                  </span>
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
