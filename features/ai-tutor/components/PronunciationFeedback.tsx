"use client";
import React from "react";

export interface PronunciationFeedbackProps {
  score: number;
}

export default function PronunciationFeedback({ score }: PronunciationFeedbackProps) {
  return (
    <div className="p-3 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 rounded-xl text-xs font-bold text-center">
      Điểm phát âm chuẩn: {score}/100
    </div>
  );
}