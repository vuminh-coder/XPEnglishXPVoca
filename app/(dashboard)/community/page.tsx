"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useAuthStore } from "@/stores/authStore";
import { useNotificationStore } from "@/stores/notificationStore";
import { PageEntranceWrapper, MotionItem } from "@/shared/components/feedback/PageEntranceAnimation";
import { AppTopHeader, HeaderPillContainer, HeaderPillItem } from "@/shared/components/layout/AppTopHeader";
import { formatCleanName } from "@/shared/components/feedback/UserAvatar";
import { Users, Home, Trophy, BookOpen, MessageSquare, Loader2 } from "lucide-react";
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
    <PageEntranceWrapper className="min-h-screen bg-slate-50 dark:bg-[#070709] text-slate-900 dark:text-slate-100 pb-16">
      {/* App Top Header with Semantic Header Pills */}
      <AppTopHeader>
        <HeaderPillContainer>
          <HeaderPillItem href="/dashboard" icon={<Home className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400" />} label="Tổng quan" />
          <HeaderPillItem active icon={<Users className="w-3.5 h-3.5 text-sky-500" />} label="Cộng đồng" />
          <HeaderPillItem href="/leaderboard" icon={<Trophy className="w-3.5 h-3.5 text-amber-500" />} label="Bảng xếp hạng" />
          <HeaderPillItem href="/study/vocabulary" icon={<BookOpen className="w-3.5 h-3.5 text-emerald-500" />} label="Luyện từ vựng" />
        </HeaderPillContainer>
      </AppTopHeader>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        <MotionItem>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Main Feed Column */}
            <div className="lg:col-span-8 space-y-5">
              <CreatePostBox
                user={user}
                currentUserName={currentUserName}
                currentUserAvatar={currentUserAvatar}
                postText={postText}
                setPostText={setPostText}
                onSubmitPost={handleCreatePost}
              />

              {loading ? (
                <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-12 text-center flex flex-col items-center justify-center gap-3">
                  <Loader2 className="w-6 h-6 animate-spin text-[#0059bb] dark:text-sky-400" />
                  <span className="text-xs font-bold text-slate-500">Đang tải bài viết cộng đồng...</span>
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
            <div className="lg:col-span-4">
              <CommunitySidebar />
            </div>
          </div>
        </MotionItem>
      </main>
    </PageEntranceWrapper>
  );
}