"use client";
import React from "react";
import { Search, Star, Play, Trash2, Video } from "lucide-react";
import { YouTubeVideoItem } from "@/stores/videoStore";

interface VideoLibraryGridProps {
  videos: YouTubeVideoItem[];
  activeVideoId?: string;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedFilter: "all" | "learning" | "done" | "favorite";
  setSelectedFilter: (f: "all" | "learning" | "done" | "favorite") => void;
  selectedCategory: string;
  setSelectedCategory: (c: string) => void;
  onSelectVideo: (video: YouTubeVideoItem) => void;
  onToggleFavorite: (id: string) => void;
  onRemoveVideo: (id: string) => void;
}

const CATEGORIES = [
  "Tất cả",
  "Communication",
  "TED Talks",
  "Business",
  "Movies",
  "News",
  "IELTS/TOEIC",
  "General",
];

export const VideoLibraryGrid: React.FC<VideoLibraryGridProps> = ({
  videos,
  activeVideoId,
  searchQuery,
  setSearchQuery,
  selectedFilter,
  setSelectedFilter,
  selectedCategory,
  setSelectedCategory,
  onSelectVideo,
  onToggleFavorite,
  onRemoveVideo,
}) => {
  return (
    <div className="space-y-4">
      {/* Search & Category Filter Bar */}
      <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-md shadow-slate-200/50 dark:shadow-black/40 space-y-3.5">
        <div className="flex flex-col md:flex-row items-stretch md:items-end justify-between gap-3">
          {/* Search Box with UI/UX Rule 6 External Label */}
          <div className="flex-1 min-w-0 space-y-1.5">
            <label
              htmlFor="video-search-input"
              className="text-[11px] font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 font-display"
            >
              <Search className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400" />
              Tìm kiếm video bài học:
            </label>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                id="video-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Nhập tiêu đề video hoặc tên kênh (VD: Steve Jobs, BBC, TED)..."
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-white focus:border-[#0059bb] focus:ring-1 focus:ring-[#0059bb] focus:outline-hidden transition-all placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Progress Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 shrink-0">
            {[
              { id: "all" as const, label: "Tất cả" },
              { id: "learning" as const, label: "Đang học" },
              { id: "done" as const, label: "Đã xong" },
              { id: "favorite" as const, label: "Yêu thích", isFav: true },
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setSelectedFilter(f.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  selectedFilter === f.id
                    ? "bg-[#0059bb] text-white shadow-md shadow-[#0059bb]/20"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                <span>{f.label}</span>
                {f.isFav && (
                  <Star
                    className={`w-3.5 h-3.5 ${
                      selectedFilter === "favorite"
                        ? "fill-amber-300 text-amber-300"
                        : "fill-amber-400 text-amber-400"
                    }`}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Category Segmented Scroll Dock */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-2 border-t border-slate-100 dark:border-slate-800 scrollbar-none no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? "bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-400 border border-blue-200 dark:border-blue-800 shadow-2xs"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {cat === "Communication" ? "Giao tiếp" : cat === "General" ? "Tổng hợp" : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Video Bento Grid Cards */}
      {videos.length === 0 ? (
        <div className="p-8 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-md text-center space-y-3 max-w-md mx-auto">
          <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
            <Video className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white font-display">
              Không tìm thấy video nào
            </h3>
            <p className="text-xs text-slate-500">
              Hãy thử tìm kiếm với từ khóa khác hoặc dán link YouTube mới ở trên!
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {videos.map((video) => (
            <div
              key={video.id}
              className={`rounded-xl bg-white dark:bg-slate-900 border transition-all overflow-hidden flex flex-col justify-between group hover:-translate-y-1 hover:shadow-xl duration-300 ${
                activeVideoId === video.id
                  ? "border-[#0059bb] ring-2 ring-[#0059bb]/20 shadow-md"
                  : "border-slate-200/90 dark:border-slate-800 hover:border-[#0059bb]/60 shadow-md shadow-slate-200/40 dark:shadow-black/30"
              }`}
            >
              <div>
                {/* Thumbnail HD */}
                <div className="relative aspect-video bg-slate-950 overflow-hidden">
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/10 transition-colors" />

                  {/* Play Overlay Button */}
                  <button
                    type="button"
                    onClick={() => onSelectVideo(video)}
                    className="absolute inset-0 flex items-center justify-center cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#0059bb]/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </button>

                  {/* Duration Badge */}
                  <span className="absolute right-2.5 bottom-2.5 px-2 py-0.5 rounded-md bg-slate-950/80 text-white text-[10px] font-mono font-bold backdrop-blur-xs">
                    {video.duration}
                  </span>

                  {/* Favorite Star */}
                  <button
                    type="button"
                    onClick={() => onToggleFavorite(video.id)}
                    className="absolute left-2.5 top-2.5 p-1.5 rounded-lg bg-slate-950/60 hover:bg-slate-950/90 text-amber-400 transition-all cursor-pointer backdrop-blur-xs"
                    title={video.isFavorite ? "Bỏ yêu thích" : "Đánh dấu yêu thích"}
                  >
                    <Star className={`w-4 h-4 ${video.isFavorite ? "fill-current" : ""}`} />
                  </button>
                </div>

                {/* Info Card */}
                <div className="p-4 space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2 py-0.5 rounded-md text-[9.5px] font-bold bg-blue-50 dark:bg-blue-950/60 text-[#0059bb] dark:text-sky-400 border border-blue-200 dark:border-blue-800">
                      {video.category}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">{video.savedAt}</span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 dark:text-white font-display line-clamp-2 leading-snug">
                    {video.title}
                  </h3>

                  <p className="text-xs text-slate-500 font-medium truncate">
                    Kênh: {video.authorName}
                  </p>

                  {/* Progress Bar */}
                  <div className="space-y-1 pt-1">
                    <div className="flex justify-between text-[11px] font-bold">
                      <span className="text-slate-400">Tiến độ bài học</span>
                      <span className="text-[#0059bb] dark:text-sky-400 font-mono">
                        {video.progressPercent}%
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#0059bb] to-sky-400 transition-all duration-300"
                        style={{ width: `${video.progressPercent}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="p-3.5 bg-slate-50 dark:bg-slate-950/50 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => onRemoveVideo(video.id)}
                  className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-all cursor-pointer"
                  title="Xóa khỏi danh sách"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => onSelectVideo(video)}
                  className="px-4 py-2 rounded-xl bg-[#0059bb] hover:bg-[#004899] text-white text-xs font-bold transition-all shadow-md shadow-[#0059bb]/20 flex items-center gap-1.5 cursor-pointer font-sans active:scale-95"
                >
                  <Play className="w-3.5 h-3.5 fill-current" /> Luyện tập ngay
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
