"use client";
import React, { useState } from "react";
import { getLessonCoverImage } from "@/shared/utils/lessonImageMapper";
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

const VERIFIED_FALLBACK_PHOTOS = [
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80",
];

export const LessonCoverImage: React.FC<LessonCoverImageProps> = ({
  lesson,
  className = "w-full h-32",
  aspectRatio = "aspect-video",
  showBadge = true,
}) => {
  const [fallbackIdx, setFallbackIdx] = useState<number>(-1);
  const [hasError, setHasError] = useState(false);

  const primaryUrl = getLessonCoverImage(lesson);
  const coverUrl =
    fallbackIdx >= 0 && fallbackIdx < VERIFIED_FALLBACK_PHOTOS.length
      ? VERIFIED_FALLBACK_PHOTOS[fallbackIdx]
      : primaryUrl;
  const title = lesson.title || "Bài Học Tiếng Anh";
  const category = lesson.category || "General";

  return (
    <div className={`relative overflow-hidden bg-slate-100 dark:bg-slate-800 group ${className} ${aspectRatio}`}>
      {/* Cover Image Element */}
      {!hasError ? (
        <img
          src={coverUrl}
          alt={title}
          onError={() => {
            if (fallbackIdx < 0) {
              const seed = (lesson.id || title).length % VERIFIED_FALLBACK_PHOTOS.length;
              setFallbackIdx(seed);
            } else {
              setHasError(true);
            }
          }}
          className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] lg:group-hover:scale-105"
        />
      ) : (
        /* Fallback Clean Canvas */
        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-slate-200 dark:from-slate-800 dark:to-slate-900 select-none">
          <div className="w-11 h-11 rounded-2xl bg-white/40 dark:bg-slate-800/60 backdrop-blur-sm border border-white/40 dark:border-slate-700/50 flex items-center justify-center shadow-2xs">
            <BookOpen className="w-5 h-5 text-[#0059bb] dark:text-sky-400" />
          </div>
        </div>
      )}

      {/* Soft Bottom Directional Scrim */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-slate-950/15 to-transparent pointer-events-none" />

      {/* Optional Top Category Badge Overlay */}
      {showBadge && (
        <div className="absolute top-2 left-2 z-20">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-[9px] font-bold font-mono uppercase tracking-wider bg-slate-950/60 text-white backdrop-blur-md border border-white/20 shadow-2xs">
            {category}
          </span>
        </div>
      )}
    </div>
  );
};
