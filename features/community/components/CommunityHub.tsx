"use client";

import React, { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "@/stores/authStore";
import { useNotificationStore } from "@/stores/notificationStore";
import { PageEntranceWrapper } from "@/shared/components/feedback/PageEntranceAnimation";
import {
  AppTopHeader,
  HeaderPillContainer,
  HeaderPillItem,
} from "@/shared/components/layout/AppTopHeader";
import { formatCleanName } from "@/shared/components/feedback/UserAvatar";
import {
  Users,
  Trophy,
  MessageSquare,
  UserPlus,
  PenSquare,
  Zap,
} from "lucide-react";
import Link from "next/link";
import {
  Post,
  CommunityFeedView,
  CommunityLeaderboardView,
  CommunityFriendsView,
  CommunityGroupsView,
} from "@/features/community";
import { CommunityTab } from "../types";

const INITIAL_COMMENTS = 3;
const LOAD_MORE_COMMENTS = 5;

interface CommunityHubProps {
  initialTab?: CommunityTab;
}

function CommunityHubContent({ initialTab }: CommunityHubProps) {
  const searchParams = useSearchParams();
  const { user, awardXp } = useAuthStore();
  const { addToast } = useNotificationStore();

  // Determine initial tab: prop takes precedence, then search param "?tab=...", default to FEED
  const resolvedInitialTab = (): CommunityTab => {
    if (initialTab) return initialTab;
    const tabParam = searchParams.get("tab")?.toUpperCase();
    if (tabParam === "LEADERBOARD" || tabParam === "RANK" || tabParam === "XEP-HANG") return "LEADERBOARD";
    if (tabParam === "FRIENDS" || tabParam === "BAN-BE") return "FRIENDS";
    if (tabParam === "GROUPS" || tabParam === "NHOM-HOC") return "GROUPS";
    return "FEED";
  };

  const [activeTab, setActiveTab] = useState<CommunityTab>(resolvedInitialTab);

  // Feed Posts State
  const [posts, setPosts] = useState<Post[]>([]);
  const [feedLoading, setFeedLoading] = useState(true);
  const [postText, setPostText] = useState("");
  const [commentText, setCommentText] = useState<Record<string, string>>({});
  const [activeCommentId, setActiveCommentId] = useState<string | null>(null);
  const [visibleComments, setVisibleComments] = useState<Record<string, number>>({});

  const currentUserAvatar = (user as any)?.avatar || (user as any)?.avatarUrl || user?.imageUrl;
  const currentUserName = formatCleanName(user?.fullName || user?.username || user?.email);

  // Load feed posts on mount
  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((res) => {
        if (res.success && res.data) {
          setPosts(res.data);
        }
        setFeedLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching posts:", err);
        setFeedLoading(false);
      });
  }, []);

  // Sync tab change with URL without triggering full reload
  const handleTabChange = (tab: CommunityTab) => {
    setActiveTab(tab);
    if (typeof window !== "undefined") {
      const tabParam = tab.toLowerCase();
      const newUrl = tab === "FEED" ? "/community" : `/community?tab=${tabParam}`;
      window.history.replaceState(null, "", newUrl);
    }
  };

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

  // Adaptive Desktop CTA button based on active tab
  const renderHeaderRightContent = () => {
    if (activeTab === "FEED") {
      return (
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
      );
    }

    if (activeTab === "LEADERBOARD") {
      return (
        <Link
          href="/study/practice"
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0059bb] hover:bg-[#004ba0] text-white font-bold text-xs shadow-xs transition-all active:scale-95 cursor-pointer shrink-0"
        >
          <Zap className="w-3.5 h-3.5 fill-current text-amber-300" />
          <span>Luyện Tập Đua Top +15 XP</span>
        </Link>
      );
    }

    if (activeTab === "FRIENDS") {
      return (
        <button
          type="button"
          onClick={() => {
            const input = document.querySelector('input[type="text"]') as HTMLInputElement;
            if (input) {
              input.focus();
              input.scrollIntoView({ behavior: "smooth", block: "center" });
            }
          }}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0059bb] hover:bg-[#004ba0] text-white font-bold text-xs shadow-xs transition-all active:scale-95 cursor-pointer shrink-0"
        >
          <UserPlus className="w-3.5 h-3.5" />
          <span>Tìm Bạn Mới +10 XP</span>
        </button>
      );
    }

    return null;
  };

  return (
    <PageEntranceWrapper className="space-y-4 pb-16 md:pb-8 px-0 relative select-none font-sans" suppressHydrationWarning>
      {/* 1. APP TOP HEADER INTEGRATION WITH SPRING SLIDING PILL */}
      <AppTopHeader rightDesktopContent={renderHeaderRightContent()}>
        <HeaderPillContainer>
          <HeaderPillItem
            active={activeTab === "FEED"}
            onClick={() => handleTabChange("FEED")}
            layoutId="communityActiveTab"
            icon={<MessageSquare className="w-3.5 h-3.5 text-blue-500" />}
            label="Bảng Tin"
          />
          <HeaderPillItem
            active={activeTab === "LEADERBOARD"}
            onClick={() => handleTabChange("LEADERBOARD")}
            layoutId="communityActiveTab"
            icon={<Trophy className="w-3.5 h-3.5 text-amber-500" />}
            label="Xếp Hạng"
          />
          <HeaderPillItem
            active={activeTab === "FRIENDS"}
            onClick={() => handleTabChange("FRIENDS")}
            layoutId="communityActiveTab"
            icon={<UserPlus className="w-3.5 h-3.5 text-sky-500" />}
            label="Bạn Bè"
          />
          <HeaderPillItem
            active={activeTab === "GROUPS"}
            onClick={() => handleTabChange("GROUPS")}
            layoutId="communityActiveTab"
            icon={<Users className="w-3.5 h-3.5 text-indigo-500" />}
            label="Nhóm Học"
          />
        </HeaderPillContainer>
      </AppTopHeader>

      {/* 2. MAIN CONTAINER - FLUID ULTRA-WIDE CANVAS */}
      <div className="w-full max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 space-y-4 pt-1">
        <AnimatePresence mode="wait">
          {activeTab === "FEED" && (
            <motion.div
              key="feed-view"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.11, ease: [0.2, 0, 0, 1] }}
            >
              <CommunityFeedView
                posts={posts}
                loading={feedLoading}
                user={user}
                currentUserName={currentUserName}
                currentUserAvatar={currentUserAvatar}
                postText={postText}
                setPostText={setPostText}
                commentText={commentText}
                setCommentText={setCommentText}
                activeCommentId={activeCommentId}
                setActiveCommentId={setActiveCommentId}
                getVisibleCount={getVisibleCount}
                handleShowMoreComments={handleShowMoreComments}
                handleCreatePost={handleCreatePost}
                handleLikePost={handleLikePost}
                handleAddComment={handleAddComment}
              />
            </motion.div>
          )}

          {activeTab === "LEADERBOARD" && (
            <motion.div
              key="leaderboard-view"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.11, ease: [0.2, 0, 0, 1] }}
            >
              <CommunityLeaderboardView user={user} awardXp={awardXp} />
            </motion.div>
          )}

          {activeTab === "FRIENDS" && (
            <motion.div
              key="friends-view"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.11, ease: [0.2, 0, 0, 1] }}
            >
              <CommunityFriendsView user={user} awardXp={awardXp} />
            </motion.div>
          )}

          {activeTab === "GROUPS" && (
            <motion.div
              key="groups-view"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.11, ease: [0.2, 0, 0, 1] }}
            >
              <CommunityGroupsView user={user} awardXp={awardXp} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageEntranceWrapper>
  );
}

export function CommunityHub(props: CommunityHubProps) {
  return (
    <Suspense fallback={null}>
      <CommunityHubContent {...props} />
    </Suspense>
  );
}
