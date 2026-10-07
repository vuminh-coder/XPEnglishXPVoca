"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  PlusCircle,
  ThumbsUp,
  Video,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { extractYouTubeVideoId } from "@/features/listening/utils/videoUrlHelper";
import { ShimmerBox } from "./LoadingSkeletons";

interface VideoRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

interface CommunityRequestItem {
  id: string;
  youtubeUrl: string;
  topicCategory: string | null;
  notes: string | null;
  status: string;
  votesCount: number;
  hasVoted?: boolean;
  createdAt: string;
}

const CATEGORY_OPTIONS = [
  { slug: "ted-ed", name: "TED-Ed & Tư duy" },
  { slug: "bbc-6-minute", name: "BBC 6 Minute" },
  { slug: "ielts-listening", name: "IELTS Listening" },
  { slug: "toeic-listening", name: "TOEIC Luyện nghe" },
  { slug: "daily-conversations", name: "Giao tiếp đời thực" },
  { slug: "business-english", name: "Tiếng Anh công sở" },
  { slug: "kurzgesagt", name: "Khoa học & Vũ trụ" },
  { slug: "music-english", name: "Âm nhạc & Nối âm" },
];

export const VideoRequestModal: React.FC<VideoRequestModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [activeTab, setActiveTab] = useState<"submit" | "community">("submit");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ted-ed");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  // Community Requests list state
  const [communityRequests, setCommunityRequests] = useState<CommunityRequestItem[]>([]);
  const [isLoadingRequests, setIsLoadingRequests] = useState(false);
  const [votedIds, setVotedIds] = useState<Set<string>>(new Set());

  // Extracted preview video ID
  const previewVideoId = extractYouTubeVideoId(youtubeUrl);

  const fetchCommunityRequests = async () => {
    setIsLoadingRequests(true);
    try {
      const res = await fetch("/api/video-catalog/request-lesson");
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.requests)) {
          setCommunityRequests(data.requests);
        }
      }
    } catch (err) {
      console.warn("Failed to load community video requests:", err);
    } finally {
      setIsLoadingRequests(false);
    }
  };

  useEffect(() => {
    if (isOpen && activeTab === "community") {
      fetchCommunityRequests();
    }
  }, [isOpen, activeTab]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!previewVideoId) {
      setSubmitError("Vui lòng nhập đường dẫn video YouTube hợp lệ.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(null);

    try {
      const res = await fetch("/api/video-catalog/request-lesson", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          youtubeUrl,
          topicCategory: selectedCategory,
          notes,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitSuccess(data.message || "Đề xuất video thành công!");
        setYoutubeUrl("");
        setNotes("");
        onSuccess?.();
        setTimeout(() => {
          setActiveTab("community");
          fetchCommunityRequests();
          setSubmitSuccess(null);
        }, 1500);
      } else {
        setSubmitError(data.error || "Gửi yêu cầu không thành công.");
      }
    } catch (err: any) {
      setSubmitError(err?.message || "Đã xảy ra lỗi khi gửi yêu cầu.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVote = async (reqId: string, currentUrl: string) => {
    if (votedIds.has(reqId)) return;

    // Optimistic UI vote
    setVotedIds((prev) => new Set(prev).add(reqId));
    setCommunityRequests((prev) =>
      prev.map((item) =>
        item.id === reqId ? { ...item, votesCount: item.votesCount + 1, hasVoted: true } : item
      )
    );

    try {
      await fetch("/api/video-catalog/request-lesson", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ youtubeUrl: currentUrl }),
      });
    } catch (err) {
      console.warn("Vote request error:", err);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/70">
            <div className="flex items-center gap-2.5">
              <div className="w-8.5 h-8.5 rounded-xl bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-[#0059bb] dark:text-sky-400">
                <Video className="w-4.5 h-4.5 text-[#0059bb] dark:text-sky-400" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Đề Xuất Video Học Mới
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Cùng xây dựng kho học liệu video tiếng Anh phong phú nhất
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-4.5 h-4.5" />
            </button>
          </div>

          {/* Sub-Tabs Switcher */}
          <div className="flex border-b border-slate-200 dark:border-slate-800 px-5 bg-white dark:bg-slate-900">
            <button
              type="button"
              onClick={() => setActiveTab("submit")}
              className={`pb-3 pt-3 text-xs sm:text-sm font-semibold flex items-center gap-1.5 relative transition-colors ${
                activeTab === "submit"
                  ? "text-[#0059bb] dark:text-sky-400"
                  : "text-slate-500 hover:text-slate-800 dark:text-slate-400"
              }`}
            >
              <PlusCircle className="w-4 h-4" />
              <span>Gửi Link Video Mới</span>
              {activeTab === "submit" && (
                <motion.div
                  layoutId="videoRequestTabIndicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0059bb] dark:bg-sky-400 rounded-full"
                />
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("community")}
              className={`ml-6 pb-3 pt-3 text-xs sm:text-sm font-semibold flex items-center gap-1.5 relative transition-colors ${
                activeTab === "community"
                  ? "text-[#0059bb] dark:text-sky-400"
                  : "text-slate-500 hover:text-slate-800 dark:text-slate-400"
              }`}
            >
              <ThumbsUp className="w-4 h-4" />
              <span>Cộng Đồng Đang Bình Chọn</span>
              {activeTab === "community" && (
                <motion.div
                  layoutId="videoRequestTabIndicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0059bb] dark:bg-sky-400 rounded-full"
                />
              )}
            </button>
          </div>

          {/* Body */}
          <div className="p-5 overflow-y-auto flex-1">
            {activeTab === "submit" ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* External Label (Rule 6) */}
                <div>
                  <label
                    htmlFor="youtubeUrlInput"
                    className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
                  >
                    Đường dẫn YouTube (URL hoặc Shorts) *
                  </label>
                  <input
                    id="youtubeUrlInput"
                    type="url"
                    value={youtubeUrl}
                    onChange={(e) => setYoutubeUrl(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=UF8uR6Z6KLc"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs sm:text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0059bb]/20 focus:border-[#0059bb] transition-all"
                  />
                </div>

                {/* Video Preview Card if valid YouTube ID */}
                {previewVideoId && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 flex items-center gap-3"
                  >
                    <img
                      src={`https://img.youtube.com/vi/${previewVideoId}/hqdefault.jpg`}
                      alt="YouTube Preview"
                      className="w-20 h-12 object-cover rounded-lg border border-slate-200 dark:border-slate-800 shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        Mã Video: {previewVideoId}
                      </p>
                      <p className="text-[11px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-medium mt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                        <span>Đã nhận diện video YouTube hợp lệ</span>
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Category Selection Chips (Rule 14) */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Chủ đề đề xuất
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {CATEGORY_OPTIONS.map((cat) => (
                      <button
                        type="button"
                        key={cat.slug}
                        onClick={() => setSelectedCategory(cat.slug)}
                        className={`px-2.5 py-2 rounded-xl text-xs font-medium text-center border transition-all cursor-pointer ${
                          selectedCategory === cat.slug
                            ? "bg-[#0059bb]/10 border-[#0059bb] text-[#0059bb] dark:text-sky-400 font-bold shadow-2xs"
                            : "bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/80 text-slate-600 dark:text-slate-400 hover:border-slate-300"
                        }`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Notes Input */}
                <div>
                  <label
                    htmlFor="notesInput"
                    className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
                  >
                    Ghi chú thêm (Tuỳ chọn)
                  </label>
                  <textarea
                    id="notesInput"
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Ví dụ: Giọng đọc hay, phù hợp luyện Shadowing Part 4..."
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs sm:text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0059bb]/20 focus:border-[#0059bb] transition-all resize-none"
                  />
                </div>

                {/* Alerts */}
                {submitError && (
                  <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{submitError}</span>
                  </div>
                )}

                {submitSuccess && (
                  <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{submitSuccess}</span>
                  </div>
                )}

                {/* Action Buttons (Rule 18: Single Primary Button) */}
                <div className="flex items-center justify-end gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    Đóng
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || !previewVideoId}
                    className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#0059bb] hover:bg-[#004ba0] text-white shadow-sm hover:shadow transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Đang gửi...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                        <span>Gửi Đề Xuất Bài Học</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              /* Community Requests List */
              <div className="space-y-3">
                {isLoadingRequests ? (
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="p-3 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 flex items-center gap-3 select-none"
                      >
                        <ShimmerBox className="w-16 h-10 rounded-lg shrink-0" />
                        <div className="min-w-0 flex-1 space-y-1.5">
                          <div className="flex items-center gap-2">
                            <ShimmerBox className="h-3.5 w-16 rounded-full" />
                            <ShimmerBox className="h-3 w-14 rounded" />
                          </div>
                          <ShimmerBox className="h-4 w-4/5 rounded" />
                        </div>
                        <ShimmerBox className="w-14 h-8 rounded-xl shrink-0" />
                      </div>
                    ))}
                  </div>
                ) : communityRequests.length === 0 ? (
                  <div className="py-12 text-center text-slate-400 text-xs">
                    <Video className="w-8 h-8 mx-auto mb-2 text-slate-300 dark:text-slate-700" />
                    <p>Chưa có đề xuất nào từ cộng đồng. Hãy là người đầu tiên gửi link!</p>
                  </div>
                ) : (
                  communityRequests.map((reqItem) => {
                    const videoId = extractYouTubeVideoId(reqItem.youtubeUrl);
                    const isVoted = votedIds.has(reqItem.id);

                    return (
                      <div
                        key={reqItem.id}
                        className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 flex items-center gap-3 transition-colors hover:border-slate-300 dark:hover:border-slate-700"
                      >
                        {videoId && (
                          <img
                            src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                            alt="Video Thumbnail"
                            className="w-16 h-10 object-cover rounded-lg border border-slate-200 dark:border-slate-800 shrink-0"
                          />
                        )}
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-400 text-[10px] font-bold uppercase tracking-wider">
                              {reqItem.topicCategory || "General"}
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono">
                              {new Date(reqItem.createdAt).toLocaleDateString("vi-VN")}
                            </span>
                          </div>
                          <p className="text-xs font-semibold text-slate-900 dark:text-white truncate mt-1">
                            {reqItem.notes || reqItem.youtubeUrl}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleVote(reqItem.id, reqItem.youtubeUrl)}
                          disabled={isVoted}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                            isVoted
                              ? "bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400"
                              : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-[#0059bb] hover:text-[#0059bb]"
                          }`}
                        >
                          <ThumbsUp className={`w-3.5 h-3.5 ${isVoted ? "fill-current" : ""}`} />
                          <span>{reqItem.votesCount}</span>
                        </button>
                      </div>
                    );
                  })
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
