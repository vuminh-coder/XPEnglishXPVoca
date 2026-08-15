"use client";
import React, { useState } from "react";
import { getLessonCoverImage } from "@/lib/utils/lessonImageMapper";
import { BookOpen } from "lucide-react";

interface LessonCoverImageProps {
  lesson: {
    id?: string;
    title?: string;
    category?: string;
    tags?: string[];
    imageUrl?: string;
  };
  className?: string;
  aspectRatio?: string;
  showBadge?: boolean;
}

export const LessonCoverImage: React.FC<LessonCoverImageProps> = ({
  lesson,
  className = "w-full h-32",
  aspectRatio = "aspect-video",
  showBadge = true,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const coverUrl = getLessonCoverImage(lesson);
  const title = lesson.title || "Bài Học Tiếng Anh";
  const category = lesson.category || "General";
  const firstChar = title.trim().charAt(0).toUpperCase() || "A";

  return (
    <div className={`relative overflow-hidden rounded-xs bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-white/10 group ${className} ${aspectRatio}`}>
      {/* 1. Skeleton Loading Shimmer */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800 animate-pulse flex items-center justify-center z-10">
          <BookOpen className="w-5 h-5 text-slate-400 opacity-50" />
        </div>
      )}

      {/* 2. Cover Image Element */}
      {!hasError ? (
        <img
          src={coverUrl}
          alt={title}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          loading="lazy"
        />
      ) : (
        /* 3. Fallback High-End Gradient Canvas */
        <div className="w-full h-full bg-gradient-to-br from-[#0059bb] via-[#004799] to-slate-900 text-white p-3 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-amber-400/20 rounded-full blur-xl pointer-events-none" />
          <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-xs bg-white/20 text-amber-300 w-fit font-display">
            {category}
          </span>
          <div className="space-y-0.5 relative z-10">
            <span className="text-xl font-black font-display text-white/20 block leading-none">{firstChar}</span>
            <span className="text-xs font-bold font-display line-clamp-2 text-white">{title}</span>
          </div>
        </div>
      )}

      {/* Subtle Overlay Gradient for Title Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 pointer-events-none" />

      {/* Optional Top Category Badge Overlay */}
      {showBadge && (
        <div className="absolute top-2 left-2 z-20">
          <span className="px-1.5 py-0.5 rounded-xs text-[8.5px] font-black uppercase tracking-wider bg-slate-900/80 backdrop-blur-md text-amber-300 border border-white/10 font-display">
            {category}
          </span>
        </div>
      )}
    </div>
  );
};
