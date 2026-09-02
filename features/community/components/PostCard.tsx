"use client";

import React from "react";
import { Heart, MessageCircle, Send, ChevronDown } from "lucide-react";
import { UserAvatar } from "@/shared/components/feedback/UserAvatar";
import { Post } from "../types";

interface PostCardProps {
  post: Post;
  user: any;
  currentUserName: string;
  currentUserAvatar: string | undefined;
  activeCommentId: string | null;
  setActiveCommentId: (id: string | null) => void;
  commentText: string;
  setCommentText: (text: string) => void;
  visibleCount: number;
  onShowMoreComments: () => void;
  onLikePost: () => void;
  onAddComment: () => void;
}

export function PostCard({
  post,
  user,
  currentUserName,
  currentUserAvatar,
  activeCommentId,
  setActiveCommentId,
  commentText,
  setCommentText,
  visibleCount,
  onShowMoreComments,
  onLikePost,
  onAddComment,
}: PostCardProps) {
  const isCommentOpen = activeCommentId === post.id;
  const comments = post.comments || [];
  const shownComments = comments.slice(0, visibleCount);
  const remainingCount = comments.length - shownComments.length;

  return (
    <article className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-2xs space-y-4">
      {/* Post Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <UserAvatar
            avatarUrl={post.authorAvatar || post.avatar}
            emoji={post.avatarEmoji || "🦉"}
            name={post.author}
            size="md"
          />
          <div>
            <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white leading-none">
              {post.author}
            </h3>
            <span className="text-[11px] text-slate-400 font-medium block mt-1">
              {post.meta}
            </span>
          </div>
        </div>
      </div>

      {/* Post Content */}
      <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium leading-relaxed whitespace-pre-wrap">
        {post.content}
      </p>

      {/* Vocab Tags */}
      {post.vocabTags && post.vocabTags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-1">
          {post.vocabTags.map((tag, idx) => (
            <span
              key={`tag_${idx}`}
              className="text-[11px] font-bold text-[#0059bb] dark:text-sky-400 bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-900/50 px-2.5 py-0.5 rounded-lg"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Action Footer: Like and Comment Button */}
      <div className="flex items-center gap-4 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs font-bold text-slate-500">
        <button
          onClick={onLikePost}
          className={`flex items-center gap-1.5 transition-colors cursor-pointer py-1 px-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 ${
            post.liked ? "text-rose-600 dark:text-rose-400" : "text-slate-600 dark:text-slate-400"
          }`}
        >
          <Heart className={`w-4 h-4 ${post.liked ? "fill-rose-500 text-rose-500" : ""}`} />
          <span>{post.likes || 0} Thích</span>
        </button>

        <button
          onClick={() => setActiveCommentId(isCommentOpen ? null : post.id)}
          className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer py-1 px-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <MessageCircle className="w-4 h-4" />
          <span>{post.commentsCount || comments.length} Bình luận</span>
        </button>
      </div>

      {/* Comments Section */}
      {isCommentOpen && (
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3">
          {shownComments.map((comment) => (
            <div key={comment.id} className="flex items-start gap-2.5 bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl">
              <UserAvatar
                avatarUrl={comment.avatar}
                emoji={comment.avatarEmoji || "🦉"}
                name={comment.author}
                size="sm"
              />
              <div className="flex-1 space-y-0.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900 dark:text-white">
                    {comment.author}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {comment.timeAgo || "Vừa xong"}
                  </span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                  {comment.content}
                </p>
              </div>
            </div>
          ))}

          {remainingCount > 0 && (
            <button
              onClick={onShowMoreComments}
              className="text-xs font-bold text-[#0059bb] dark:text-sky-400 hover:underline flex items-center gap-1 py-1 cursor-pointer"
            >
              <ChevronDown className="w-3.5 h-3.5" />
              <span>Xem thêm {remainingCount} bình luận...</span>
            </button>
          )}

          {/* Add Comment Box */}
          <div className="flex items-center gap-2 pt-1">
            <UserAvatar
              avatarUrl={currentUserAvatar}
              emoji={user?.avatarEmoji || "🦉"}
              name={currentUserName}
              size="sm"
            />
            <input
              type="text"
              placeholder={user ? "Viết bình luận của bạn..." : "Đăng nhập để bình luận..."}
              disabled={!user}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  onAddComment();
                }
              }}
              className="flex-1 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/90 dark:border-slate-700/80 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0059bb] disabled:opacity-60"
            />
            <button
              onClick={onAddComment}
              disabled={!commentText.trim() || !user}
              className="h-8 px-3 bg-[#0059bb] hover:bg-[#004ba0] text-white text-xs font-bold rounded-lg flex items-center gap-1 shadow-2xs transition-all cursor-pointer disabled:opacity-50"
            >
              <Send className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}
    </article>
  );
}