"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Sparkles, MessageSquare } from "lucide-react";
import {
  ShimmerBox,
  ShimmerCircle,
} from "@/shared/components/feedback/ShimmerSkeleton";
import { Post } from "../../types";
import { CommunityHeroBanner } from "../shared/CommunityHeroBanner";
import { CreatePostBox } from "../CreatePostBox";
import { PostCard } from "../PostCard";
import { CommunitySidebar } from "../CommunitySidebar";
import { FeedCategoryFilter } from "./FeedCategoryFilter";

export interface CommunityFeedViewProps {
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
      <CommunityHeroBanner
        gradientClass="from-[#0059bb] via-[#004fba] to-[#00388a]"
        badgeLeft={
          <span className="px-2.5 py-1 rounded-lg text-xs font-black uppercase tracking-wider bg-white/15 text-white border border-white/20 flex items-center gap-1.5 font-display shrink-0 shadow-2xs">
            <Users className="w-3.5 h-3.5 text-sky-200" /> 1,240+ Học Viên Online
          </span>
        }
        badgeRight={
          <span className="px-2.5 py-1 rounded-lg text-xs font-black uppercase tracking-wider bg-emerald-400/20 text-emerald-200 border border-emerald-300/30 flex items-center gap-1.5 font-display shrink-0 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-300 fill-emerald-300" /> Thưởng +20 XP / Bài Đăng
          </span>
        }
        title={
          <>
            <span>Cộng Đồng Học Tập XP English</span>
            <Sparkles className="w-4 h-4 text-amber-300 fill-amber-300 shrink-0" />
          </>
        }
        description="Chia sẻ kinh nghiệm học từ vựng, mẹo ôn thi IELTS/TOEIC và lan tỏa tinh thần học tập cùng cộng đồng chiến binh XP!"
      />

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

          <FeedCategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          {/* POSTS LISTING OR MICRO-SHIMMER SKELETON */}
          {loading ? (
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
          <CommunitySidebar user={user} />
        </div>
      </div>
    </div>
  );
}
