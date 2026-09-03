"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useAuthStore } from "@/stores/authStore";
import { useNotificationStore } from "@/stores/notificationStore";
import { PageEntranceWrapper, MotionItem } from "@/shared/components/feedback/PageEntranceAnimation";
import { AppTopHeader, HeaderPillContainer, HeaderPillItem } from "@/shared/components/layout/AppTopHeader";
import { formatCleanName } from "@/shared/components/feedback/UserAvatar";
import { Users, Trophy, MessageSquare, UserPlus, PenSquare, Sparkles } from "lucide-react";
import {
  Post,
  PostCard,
  CreatePostBox,
  CommunitySidebar,
} from "@/features/community";

const INITIAL_COMMENTS = 3;
const LOAD_MORE_COMMENTS = 5;

export default function CommunityPage() {
  const { user, awardXp } = useAuthStore();
  const { addToast } = useNotificationStore();

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [postText, setPostText] = useState("");
  const [commentText, setCommentText] = useState<Record<string, string>>({});
  const [activeCommentId, setActiveCommentId] = useState<string | null>(null);
  const [visibleComments, setVisibleComments] = useState<Record<string, number>>({});

  const currentUserAvatar = (user as any)?.avatar || (user as any)?.avatarUrl || user?.imageUrl;
  const currentUserName = formatCleanName(user?.fullName || user?.username || user?.email);

  // Load posts from API
  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((res) => {
        if (res.success && res.data) {
          setPosts(res.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching posts:", err);
        setLoading(false);
      });
  }, []);

  const getVisibleCount = useCallback(
    (postId: string) => {
      return visibleComments[postId] || INITIAL_COMMENTS;
    },
    [visibleComments]
  );

  const handleShowMoreComments = useCallback((postId: string) => {
    setVisibleComments((prev) => ({
      ...prev,
      [postId]: (prev[postId] || INITIAL_COMMENTS) + LOAD_MORE_COMMENTS,
    }));
  }, []);

  const handleCreatePost = async () => {
    if (!postText.trim() || !user) return;

    const currentContent = postText.trim();
    setPostText("");
    awardXp(20);
    addToast({ type: "success", title: "Thành công", message: "Đã đăng bài viết! Nhận +20 XP 🎉" });

    // Optimistic Instant Render
    const tempId = `temp-${Date.now()}`;
    const hashtagRegex = /#[\wÀ-ỹ]+/g;
    const tags = currentContent.match(hashtagRegex) || [];

    const tempPost: Post = {
      id: tempId,
      author: currentUserName,
      avatar: currentUserAvatar,
      authorAvatar: currentUserAvatar,
      avatarEmoji: user.avatarEmoji || "🦉",
      meta: "Vừa xong · " + (user.title || "Member"),
      content: currentContent,
      vocabTags: Array.from(new Set(tags)),
      likes: 0,
      commentsCount: 0,
      liked: false,
      comments: [],
    };

    setPosts((prev) => [tempPost, ...prev]);

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: currentContent }),
      });
      const data = await res.json();
      if (data.success && data.data) {
        setPosts((prev) =>
          prev.map((p) =>
            p.id === tempId
              ? {
                  ...data.data,
                  author: currentUserName,
                  avatar: currentUserAvatar,
                  authorAvatar: currentUserAvatar,
                }
              : p
          )
        );
      }
    } catch (err) {
      console.error("Error creating post:", err);
    }
  };

  const handleLikePost = async (id: string) => {
    // Optimistic toggle
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const nextLiked = !p.liked;
          const nextLikes = nextLiked ? p.likes + 1 : Math.max(0, p.likes - 1);
          return { ...p, liked: nextLiked, likes: nextLikes };
        }
        return p;
      })
    );

    try {
      const res = await fetch(`/api/posts/${id}/like`, { method: "POST" });
      const data = await res.json();
      if (data.success && data.data) {
        const { liked, likesCount } = data.data;
        setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, likes: likesCount, liked } : p)));
      }
    } catch (err) {
      console.error("Error liking post:", err);
    }
  };

  const handleAddComment = async (postId: string) => {
    const text = commentText[postId] || "";
    if (!text.trim() || !user) return;

    const optimisticComment = {
      id: `temp-cmt-${Date.now()}`,
      author: currentUserName,
      avatar: currentUserAvatar,
      avatarEmoji: user.avatarEmoji || "🦉",
      content: text.trim(),
      timeAgo: "Vừa xong",
    };

    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? {
              ...p,
              commentsCount: (p.commentsCount || 0) + 1,
              comments: [...(p.comments || []), optimisticComment],
            }
          : p
      )
    );

    setCommentText((prev) => ({ ...prev, [postId]: "" }));
    awardXp(5);
    addToast({ type: "success", title: "Bình luận", message: "Đã gửi bình luận! +5 XP 🎉" });

    try {
      await fetch(`/api/posts/${postId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: text.trim() }),
      });
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

  return (
    <PageEntranceWrapper className="space-y-4 pb-16 md:pb-8 px-0 relative select-none font-sans" suppressHydrationWarning>
      {/* 1. APP TOP HEADER INTEGRATION */}
      <AppTopHeader
        rightDesktopContent={
          <button
            type="button"
            onClick={() => {
              const textarea = document.getElementById("post-textarea") || document.querySelector("textarea");
              if (textarea) {
                textarea.focus();
                textarea.scrollIntoView({ behavior: "smooth", block: "center" });
              }
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0059bb] hover:bg-[#004ba0] text-white font-bold text-xs shadow-xs transition-all active:scale-95 cursor-pointer shrink-0"
          >
            <PenSquare className="w-3.5 h-3.5" />
            <span>Đăng Bài Viết +20 XP</span>
          </button>
        }
      >
        <HeaderPillContainer>
          <HeaderPillItem
            active={true}
            icon={<MessageSquare className="w-3.5 h-3.5 text-blue-500" />}
            label="Bảng Tin"
          />
          <HeaderPillItem
            href="/community/leaderboard"
            active={false}
            icon={<Trophy className="w-3.5 h-3.5 text-amber-500" />}
            label="Xếp Hạng"
          />
          <HeaderPillItem
            href="/community/friends"
            active={false}
            icon={<UserPlus className="w-3.5 h-3.5 text-sky-500" />}
            label="Bạn Bè"
          />
          <HeaderPillItem
            href="/community/groups"
            active={false}
            icon={<Users className="w-3.5 h-3.5 text-indigo-500" />}
            label="Nhóm Học"
          />
        </HeaderPillContainer>
      </AppTopHeader>

      {/* 2. MAIN CONTAINER - FLUID ULTRA-WIDE CANVAS (1600px/1760px STANDARD) */}
      <div className="w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 space-y-4 pt-1">
        
        {/* HERO SPOTLIGHT BANNER */}
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

        {/* 3. BENTO GRID LAYOUT (FEED 8/12 + SIDEBAR 4/12) */}
        <MotionItem>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
            {/* Main Feed Column */}
            <div className="lg:col-span-8 space-y-4">
              <CreatePostBox
                user={user}
                currentUserName={currentUserName}
                currentUserAvatar={currentUserAvatar}
                postText={postText}
                setPostText={setPostText}
                onSubmitPost={handleCreatePost}
              />

              {loading ? (
                /* RICH 3-CARD SHIMMER SKELETON FOR DATABASE LOADING (ZERO CLS) */
                <div className="space-y-4 animate-pulse">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-3.5"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 shrink-0" />
                          <div className="space-y-1.5">
                            <div className="flex items-center gap-2">
                              <div className="w-28 h-4 rounded-md bg-slate-200 dark:bg-slate-800" />
                              <div className="w-14 h-4 rounded-md bg-blue-500/20" />
                            </div>
                            <div className="w-20 h-3 rounded-md bg-slate-100 dark:bg-slate-800" />
                          </div>
                        </div>
                        <div className="w-8 h-4 rounded-md bg-slate-100 dark:bg-slate-800" />
                      </div>

                      <div className="space-y-2 pt-1">
                        <div className="w-full h-3.5 rounded-md bg-slate-200 dark:bg-slate-800" />
                        <div className="w-5/6 h-3.5 rounded-md bg-slate-200 dark:bg-slate-800" />
                        <div className="w-3/5 h-3.5 rounded-md bg-slate-100 dark:bg-slate-800" />
                      </div>

                      <div className="flex items-center gap-2 pt-1">
                        <div className="w-20 h-6 rounded-lg bg-blue-50 dark:bg-blue-950/40" />
                        <div className="w-24 h-6 rounded-lg bg-slate-100 dark:bg-slate-800" />
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-6 rounded-lg bg-slate-100 dark:bg-slate-800" />
                          <div className="w-16 h-6 rounded-lg bg-slate-100 dark:bg-slate-800" />
                        </div>
                        <div className="w-12 h-6 rounded-lg bg-slate-100 dark:bg-slate-800" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : posts.length === 0 ? (
                <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-12 text-center space-y-2">
                  <MessageSquare className="w-10 h-10 text-slate-300 dark:text-slate-700 mx-auto" />
                  <h3 className="font-bold text-sm text-slate-700 dark:text-slate-300">Chưa có bài viết nào</h3>
                  <p className="text-xs text-slate-400">Hãy là người đầu tiên chia sẻ cảm nghĩ hoặc từ vựng mới!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {posts.map((post) => (
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
                </div>
              )}
            </div>

            {/* Sidebar Column */}
            <div className="lg:col-span-4 sticky top-4">
              <CommunitySidebar />
            </div>
          </div>
        </MotionItem>
      </div>
    </PageEntranceWrapper>
  );
}