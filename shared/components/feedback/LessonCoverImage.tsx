"use client";
import React, { useState } from "react";
import { getLessonCoverImage } from "@/features/listening/utils/lessonImageMapper";
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
          className={`w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          loading="lazy"
        />
      ) : (
        /* 3. Fallback High-End Gradient Canvas */
        <div className="w-full h-full bg-gradient-to-br from-[#0059bb] via-[#004799] to-slate-900 text-white p-3 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-amber-400/20 rounded-full blur-xl pointer-events-none" />
          <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-lg bg-white/20 text-amber-300 w-fit font-display border border-white/20">
            {category}
          </span>
          <div className="space-y-0.5 relative z-10">
            <span className="text-xl font-black font-display text-white/20 block leading-none">{firstChar}</span>
            <span className="text-xs font-bold font-display line-clamp-2 text-white">{title}</span>
          </div>
        </div>
      )}

      {/* 4. Soft Bottom Directional Scrim (Leaves top & center bright, protects readability) */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/20 to-transparent pointer-events-none" />

      {/* 5. Subtle Ambient Light Tone on Hover */}
      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/[0.04] transition-colors pointer-events-none" />

      {/* 6. Optional Top Category Badge Overlay (Ethereal Glassmorphism) */}
      {showBadge && (
        <div className="absolute top-2 left-2 z-20">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-[9px] font-bold font-mono uppercase tracking-wider bg-white/15 hover:bg-white/20 text-white backdrop-blur-md border border-white/25 shadow-2xs">
            {category}
          </span>
        </div>
      )}
    </div>
  );
};
