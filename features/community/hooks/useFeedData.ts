"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useNotificationStore } from "@/stores/notificationStore";
import { Post } from "../types";

const INITIAL_COMMENTS = 3;
const LOAD_MORE_COMMENTS = 5;

export function useFeedData(
  user: any,
  currentUserName: string,
  currentUserAvatar: string | undefined,
  awardXp: (amt: number) => void
) {
  const { addToast } = useNotificationStore();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [postText, setPostText] = useState("");
  const [commentText, setCommentText] = useState<Record<string, string>>({});
  const [activeCommentId, setActiveCommentId] = useState<string | null>(null);
  const [visibleComments, setVisibleComments] = useState<Record<string, number>>({});
  const [selectedCategory, setSelectedCategory] = useState("all");

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

  const filteredPosts = useMemo(() => {
    if (selectedCategory === "all") return posts;
    return posts.filter((p) => {
      const lowerContent = (p.content || "").toLowerCase();
      const lowerTags = (p.vocabTags || []).map((t) => t.toLowerCase()).join(" ");
      const searchKey = selectedCategory.replace("#", "").toLowerCase();
      return lowerContent.includes(searchKey) || lowerTags.includes(searchKey);
    });
  }, [posts, selectedCategory]);

  return {
    posts,
    loading,
    postText,
    setPostText,
    commentText,
    setCommentText,
    activeCommentId,
    setActiveCommentId,
    selectedCategory,
    setSelectedCategory,
    filteredPosts,
    getVisibleCount,
    handleShowMoreComments,
    handleCreatePost,
    handleLikePost,
    handleAddComment,
  };
}
