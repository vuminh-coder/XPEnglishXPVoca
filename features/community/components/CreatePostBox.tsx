"use client";

import React, { useRef } from "react";
import { Send, PenSquare, Sparkles } from "lucide-react";
import { UserAvatar } from "@/shared/components/feedback/UserAvatar";

interface CreatePostBoxProps {
  user: any;
  currentUserName: string;
  currentUserAvatar: string | undefined;
  postText: string;
  setPostText: (text: string) => void;
  onSubmitPost: () => void;
}

export function CreatePostBox({
  user,
  currentUserName,
  currentUserAvatar,
  postText,
  setPostText,
  onSubmitPost,
}: CreatePostBoxProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      onSubmitPost();
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-2xs space-y-3">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 shrink-0 flex items-center justify-center">
          <UserAvatar
            avatarUrl={currentUserAvatar}
            emoji={user?.avatarEmoji || "🦉"}
            name={currentUserName}
            size="w-10 h-10"
          />
        </div>
        <div className="flex-1 space-y-2 min-w-0">
          <textarea
            id="post-textarea"
            ref={textareaRef}
            rows={3}
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              user
                ? "Chia sẻ từ vựng tâm đắc, thắc mắc ngữ pháp hoặc bài học hôm nay... (Ctrl+Enter để đăng, dùng #hashtag)"
                : "Đăng nhập để chia sẻ cùng cộng đồng..."
            }
            disabled={!user}
            className="w-full resize-none bg-slate-50 dark:bg-slate-800/60 border border-slate-200/90 dark:border-slate-700/80 rounded-xl p-3 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0059bb] disabled:opacity-60 transition-all"
          />
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-medium text-slate-400 hidden sm:inline-flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-500" />
              Đăng bài nhận ngay <strong className="text-emerald-500 font-bold">+20 XP</strong>
            </span>
            <button
              onClick={onSubmitPost}
              disabled={!postText.trim() || !user}
              className="px-4 py-2 bg-[#0059bb] hover:bg-[#004ba0] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ml-auto"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Đăng Bài</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
