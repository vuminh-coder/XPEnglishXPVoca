"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Sparkles, MessageSquare, Hash } from "lucide-react";
import {
  Post,
  PostCard,
  CreatePostBox,
  CommunitySidebar,
} from "@/features/community";
import {
  ShimmerBox,
  ShimmerCircle,
} from "@/shared/components/feedback/ShimmerSkeleton";

interface CommunityFeedViewProps {
  posts: Post[];
  loading: boolean;
  user: any;
  currentUserName: string;
  currentUserAvatar: string | undefined;
  postText: string;
  setPostText: (val: string) => void;
  commentText: Record<string, string>;
  setCommentText: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  activeCommentId: string | null;
  setActiveCommentId: (id: string | null) => void;
  getVisibleCount: (postId: string) => number;
  handleShowMoreComments: (postId: string) => void;
  handleCreatePost: () => void;
  handleLikePost: (id: string) => void;
  handleAddComment: (postId: string) => void;
}

const FEED_CATEGORIES = [
  { id: "all", label: "Tất cả bài viết" },
  { id: "#hoidap", label: "#Hỏi đáp" },
  { id: "#chiase", label: "#Chia sẻ kinh nghiệm" },
  { id: "#ielts", label: "#IELTS / TOEIC" },
  { id: "#thaoluan", label: "#Thảo luận chung" },
];

export function CommunityFeedView({
  posts,
  loading,
  user,
  currentUserName,
  currentUserAvatar,
  postText,
  setPostText,
  commentText,
  setCommentText,
  activeCommentId,
  setActiveCommentId,
  getVisibleCount,
  handleShowMoreComments,
  handleCreatePost,
  handleLikePost,
  handleAddComment,
}: CommunityFeedViewProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredPosts = useMemo(() => {
    if (selectedCategory === "all") return posts;
    return posts.filter((p) => {
      const lowerContent = (p.content || "").toLowerCase();
      const lowerTags = (p.vocabTags || []).map((t) => t.toLowerCase()).join(" ");
      const searchKey = selectedCategory.replace("#", "").toLowerCase();
      return lowerContent.includes(searchKey) || lowerTags.includes(searchKey);
    });
  }, [posts, selectedCategory]);

  return (
    <div className="space-y-4">
      {/* 1. HERO SPOTLIGHT BANNER */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#0059bb] via-[#004fba] to-[#00388a] text-white shadow-md shadow-blue-900/20 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-56 h-56 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-10 -top-10 w-48 h-48 bg-indigo-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-2">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 flex-nowrap whitespace-nowrap overflow-x-auto no-scrollbar">
              <span className="px-2.5 py-1 rounded-lg text-xs font-black uppercase tracking-wider bg-white/15 text-white border border-white/20 flex items-center gap-1.5 font-display shrink-0 shadow-2xs">
                <Users className="w-3.5 h-3.5 text-sky-200" /> 1,240+ Học Viên Online
              </span>
              <span className="px-2.5 py-1 rounded-lg text-xs font-black uppercase tracking-wider bg-emerald-400/20 text-emerald-200 border border-emerald-300/30 flex items-center gap-1.5 font-display shrink-0 shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-emerald-300 fill-emerald-300" /> Thưởng +20 XP / Bài Đăng
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-1">
            <div className="space-y-1 max-w-2xl">
              <h1 className="text-base sm:text-lg font-bold font-display tracking-tight text-white flex items-center gap-2">
                <span>Cộng Đồng Học Tập XP English</span>
                <Sparkles className="w-4 h-4 text-amber-300 fill-amber-300 shrink-0" />
              </h1>
              <p className="text-xs text-blue-100/90 max-w-2xl font-medium leading-relaxed">
                Chia sẻ kinh nghiệm học từ vựng, mẹo ôn thi IELTS/TOEIC và lan tỏa tinh thần học tập cùng cộng đồng chiến binh XP!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. BENTO GRID: FEED 8/12 + SIDEBAR 4/12 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
        {/* Main Feed Column (lg:col-span-8) */}
        <div className="lg:col-span-8 space-y-4">
          <CreatePostBox
            user={user}
            currentUserName={currentUserName}
            currentUserAvatar={currentUserAvatar}
            postText={postText}
            setPostText={setPostText}
            onSubmitPost={handleCreatePost}
          />

          {/* LEVEL 2 SUB-TABS: FEED CATEGORY FILTER */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 overflow-x-auto no-scrollbar select-none">
            {FEED_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`relative px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer shrink-0 flex items-center gap-1.5 font-display ${
                    isActive
                      ? "text-slate-900 dark:text-white"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/40 dark:hover:bg-slate-800"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeFeedFilterIndicator"
                      transition={{ type: "spring", stiffness: 500, damping: 35 }}
                      className="absolute inset-0 bg-white dark:bg-slate-900 rounded-lg shadow-2xs z-0"
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1">
                    {cat.id !== "all" && <Hash className="w-3 h-3 text-[#0059bb] dark:text-sky-400" />}
                    {cat.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* POSTS LISTING OR MICRO-SHIMMER SKELETON */}
          {loading ? (
            /* HIGH-END GEOMETRIC SHIMMER SKELETON (ZERO CLS) */
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-3.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <ShimmerCircle size="w-10 h-10" />
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <ShimmerBox className="w-28 h-4 rounded-md" />
                          <ShimmerBox className="w-14 h-4 rounded-md bg-blue-500/20" />
                        </div>
                        <ShimmerBox className="w-20 h-3 rounded-md" />
                      </div>
                    </div>
                    <ShimmerBox className="w-10 h-4 rounded-md" />
                  </div>

                  <div className="space-y-2 pt-1">
                    <ShimmerBox className="w-full h-3.5 rounded-md" />
                    <ShimmerBox className="w-5/6 h-3.5 rounded-md" />
                    <ShimmerBox className="w-3/5 h-3.5 rounded-md" />
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <ShimmerBox className="w-20 h-6 rounded-lg bg-blue-50 dark:bg-blue-950/40" />
                    <ShimmerBox className="w-24 h-6 rounded-lg" />
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-4">
                      <ShimmerBox className="w-16 h-6 rounded-lg" />
                      <ShimmerBox className="w-16 h-6 rounded-lg" />
                    </div>
                    <ShimmerBox className="w-12 h-6 rounded-lg" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-12 text-center space-y-2 shadow-2xs">
              <MessageSquare className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto" />
              <h3 className="font-bold text-sm text-slate-700 dark:text-slate-300 font-display">
                {selectedCategory === "all" ? "Chưa có bài viết nào" : `Chưa có bài viết nào thuộc "${selectedCategory}"`}
              </h3>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                Hãy là người đầu tiên chia sẻ bài viết hoặc từ vựng mới để nhận ngay +20 XP!
              </p>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="space-y-4"
              >
                {filteredPosts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    user={user}
                    currentUserName={currentUserName}
                    currentUserAvatar={currentUserAvatar}
                    activeCommentId={activeCommentId}
                    setActiveCommentId={setActiveCommentId}
                    commentText={commentText[post.id] || ""}
                    setCommentText={(val) => setCommentText((prev) => ({ ...prev, [post.id]: val }))}
                    visibleCount={getVisibleCount(post.id)}
                    onShowMoreComments={() => handleShowMoreComments(post.id)}
                    onLikePost={() => handleLikePost(post.id)}
                    onAddComment={() => handleAddComment(post.id)}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        {/* Sidebar Column (lg:col-span-4) */}
        <div className="lg:col-span-4 sticky top-4">
          <CommunitySidebar />
        </div>
      </div>
    </div>
  );
}
