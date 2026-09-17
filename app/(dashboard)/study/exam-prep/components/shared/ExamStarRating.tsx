import React from "react";
import { Star } from "lucide-react";

export interface ExamStarRatingProps {
  level: "Beginner" | "Intermediate" | "Advanced" | string;
  className?: string;
}

export function ExamStarRating({ level, className = "" }: ExamStarRatingProps) {
  const starCount = level === "Beginner" ? 2 : level === "Intermediate" ? 3 : 5;

  return (
    <div className={`flex items-center gap-0.5 ${className}`}>
      {[1, 2, 3, 4, 5].map((starIdx) => {
        const isFilled = starIdx <= starCount;
        return (
          <Star
            key={starIdx}
            className={`w-3 h-3 ${
              isFilled ? "fill-amber-400 text-amber-400" : "text-slate-200 dark:text-slate-700"
            }`}
            strokeWidth={1.5}
          />
        );
      })}
    </div>
  );
}
