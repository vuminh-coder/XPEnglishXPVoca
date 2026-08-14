'use client';
import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/lib/store/authStore';
import { useNotificationStore } from '@/lib/store/notificationStore';
import { 
  Heart, 
  MessageCircle, 
  Send, 
  ChevronDown, 
  Trophy, 
  Users, 
  UserPlus, 
  Flame, 
  Sparkles, 
  ArrowRight,
  MessageSquare
} from 'lucide-react';
import { Button } from '@/components/ui';
import { UserAvatar, formatCleanName } from '@/components/shared/UserAvatar';

const INITIAL_COMMENTS = 3;
const LOAD_MORE_COMMENTS = 5;

export default function CommunityPage() {
  const { user, awardXp } = useAuthStore();
  const { addToast } = useNotificationStore();

  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [postText, setPostText] = useState('');
  const [commentText, setCommentText] = useState<Record<string, string>>({});
  const [activeCommentId, setActiveCommentId] = useState<string | null>(null);
  const [visibleComments, setVisibleComments] = useState<Record<string, number>>({});

  const currentUserAvatar = (user as any)?.avatar || (user as any)?.avatarUrl || user?.imageUrl;
  const currentUserName = formatCleanName(user?.fullName || user?.username || user?.email);

  // Load posts on mount
  React.useEffect(() => {
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

  const getVisibleCount = useCallback((postId: string) => {
    return visibleComments[postId] || INITIAL_COMMENTS;
  }, [visibleComments]);

  const handleShowMoreComments = useCallback((postId: string) => {
    setVisibleComments(prev => ({
      ...prev,
      [postId]: (prev[postId] || INITIAL_COMMENTS) + LOAD_MORE_COMMENTS,
    }));
  }, []);

  const handleCreatePost = async () => {
    if (!postText.trim() || !user) return;

    const currentContent = postText.trim();
    setPostText('');
    awardXp(20);
    addToast({ type: "success", title: "Thành công", message: "Đã đăng bài viết! Nhận +20 XP 🎉" });

    // OPTIMISTIC DRAFT POST (0ms INSTANT RENDER)
    const tempId = `temp-${Date.now()}`;
    const hashtagRegex = /#[\wÀ-ỹ]+/g;
    const tags = currentContent.match(hashtagRegex) || [];

    const tempPost = {
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

    setPosts(prev => [tempPost, ...prev]);

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: currentContent }),
      });
      const data = await res.json();
      if (data.success && data.data) {
        setPosts(prev => prev.map(p => p.id === tempId ? {
          ...data.data,
          author: currentUserName,
          avatar: currentUserAvatar,
          authorAvatar: currentUserAvatar
        } : p));
      }
    } catch (err) {
      console.error("Error creating post:", err);
    }
  };

  const handleLikePost = async (id: string) => {
    // OPTIMISTIC UPDATE: Instant 0ms toggle local state
    setPosts(prev => prev.map(p => {
      if (p.id === id) {
        const nextLiked = !p.liked;
        const nextLikes = nextLiked ? p.likes + 1 : Math.max(0, p.likes - 1);
        return { ...p, liked: nextLiked, likes: nextLikes };
      }
      return p;
    }));

    try {
      const res = await fetch(`/api/posts/${id}/like`, { method: "POST" });
      const data = await res.json();
      if (data.success && data.data) {
        const { liked, likesCount } = data.data;
        setPosts(prev => prev.map(p => p.id === id ? { ...p, likes: likesCount, liked } : p));
      }
    } catch (err) {
      console.error("Error liking post:", err);
    }
  };

  const handleAddComment = async (postId: string) => {
    const text = commentText[postId] || '';
    if (!text.trim() || !user) return;

    try {
      const res = await fetch(`/api/posts/${postId}/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: text.trim() }),
      });
      const data = await res.json();
      if (data.success && data.data) {
        const newComment = {
          ...data.data,
          author: currentUserName,
          avatar: currentUserAvatar,
          authorAvatar: currentUserAvatar,
          avatarEmoji: user.avatarEmoji || "👤"
        };
        setPosts(prev => prev.map(p => {
          if (p.id === postId) {
            return {
              ...p,
              comments: [...(p.comments || []), newComment],
              commentsCount: (p.commentsCount || 0) + 1
            };
          }
          return p;
        }));
        setCommentText(prev => ({ ...prev, [postId]: '' }));
      } else {
        addToast({ type: "error", title: "Lỗi", message: data.error || "Không thể gửi bình luận" });
      }
    } catch (err) {
      console.error("Error adding comment:", err);
      addToast({ type: "error", title: "Lỗi", message: "Đã xảy ra lỗi khi bình luận" });
    }
  };

  return (
    <div className="space-y-3.5 sm:space-y-5 pb-16 md:pb-6 select-none font-sans" suppressHydrationWarning>
      
      {/* 1. HERO SPOTLIGHT BANNER */}
      <div className="p-3.5 sm:p-4.5 rounded-xs bg-gradient-to-r from-[#0059bb] via-[#004799] to-[#003366] text-white shadow-2xs relative overflow-hidden">
        <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 space-y-1.5">
          <div className="flex items-center gap-1.5 sm:gap-2 flex-nowrap whitespace-nowrap overflow-x-auto no-scrollbar">
            <span className="px-1.5 py-0.5 rounded-xs text-[8.5px] sm:text-[9px] font-black uppercase tracking-wider bg-white/15 text-white border border-white/20 flex items-center gap-1 font-display shrink-0">
              <Flame className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-300 fill-amber-300" /> 1,240+ Học Viên Online
            </span>
            <span className="px-1.5 py-0.5 rounded-xs text-[8.5px] sm:text-[9px] font-bold bg-emerald-500/20 text-emerald-200 border border-emerald-400/30 shrink-0">
              Thưởng +20 XP / Bài đăng
            </span>
          </div>

          <div className="space-y-0.5">
            <h1 className="text-sm sm:text-base font-bold font-display tracking-tight text-white flex items-center gap-1.5 sm:gap-2">
              Cộng Đồng Học Tập XP English
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            </h1>
            <p className="hidden sm:block text-[10px] sm:text-xs text-blue-100/90 max-w-2xl font-medium leading-relaxed">
              Nơi giao lưu, chia sẻ kinh nghiệm luyện thi TOEIC/IELTS, mẹo ghi nhớ từ vựng và cùng nhau tiến bộ mỗi ngày!
            </p>
          </div>
        </div>
      </div>

      {/* 2. BENTO GRID LAYOUT (3/4 MAIN FEED + 1/4 SIDEBAR WIDGETS) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-4 items-start">
        
        {/* LEFT 3/4 COLUMN: COMMUNITY FEED & CREATE POST */}
        <div className="lg:col-span-8 xl:col-span-8 space-y-3.5 sm:space-y-4">
          
          {/* SEGMENTED NAVIGATION TABS */}
          <div className="p-1 rounded-xs bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 grid grid-cols-4 gap-1 w-full">
            <div className="shrink-0 sm:shrink py-1.5 px-1 sm:px-3 rounded-xs bg-[#0059bb] text-white text-[10px] sm:text-xs font-bold shadow-2xs flex items-center justify-center gap-1 sm:gap-1.5 whitespace-nowrap">
              <MessageSquare className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" /> Bảng tin
            </div>
            <Link
              href="/community/leaderboard"
              className="shrink-0 sm:shrink py-1.5 px-1 sm:px-3 rounded-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-800 text-[10px] sm:text-xs font-bold transition-all flex items-center justify-center gap-1 sm:gap-1.5 whitespace-nowrap"
            >
              <Trophy className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-500 shrink-0" /> Xếp hạng
            </Link>
            <Link
              href="/community/friends"
              className="shrink-0 sm:shrink py-1.5 px-1 sm:px-3 rounded-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-800 text-[10px] sm:text-xs font-bold transition-all flex items-center justify-center gap-1 sm:gap-1.5 whitespace-nowrap"
            >
              <UserPlus className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-sky-500 shrink-0" /> Bạn bè
            </Link>
            <Link
              href="/community/groups"
              className="shrink-0 sm:shrink py-1.5 px-1 sm:px-3 rounded-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-800 text-[10px] sm:text-xs font-bold transition-all flex items-center justify-center gap-1 sm:gap-1.5 whitespace-nowrap"
            >
              <Users className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-indigo-500 shrink-0" /> Nhóm
            </Link>
          </div>

          {/* CREATE POST CARD (COMPACT AGENCY TIER DESIGN) */}
          <div className="p-3 sm:p-4 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-2.5 sm:space-y-3">
            <div className="flex items-start gap-2.5">
              <UserAvatar
                avatar={currentUserAvatar}
                avatarUrl={currentUserAvatar}
                imageUrl={currentUserAvatar}
                emoji={user?.avatarEmoji}
                name={currentUserName}
                size="w-8 h-8 sm:w-9 sm:h-9"
              />
              <textarea
                rows={2}
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                placeholder="Chia sẻ mẹo học từ vựng hoặc thắc mắc bài tập..."
                className="w-full p-2 sm:p-2.5 rounded-xs bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/10 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0059bb] resize-none font-medium leading-relaxed"
              />
            </div>

            {/* Quick Tag Chips & Submit Action */}
            <div className="flex flex-row items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-white/5">
              <div className="flex items-center gap-1 flex-wrap">
                <span className="text-[9px] sm:text-[10px] uppercase font-bold text-slate-400 mr-0.5">Gợi ý:</span>
                <button
                  onClick={() => setPostText((prev) => (prev ? `${prev} #MeoHocTuVung` : '#MeoHocTuVung '))}
                  className="px-1.5 py-0.5 rounded-xs bg-slate-100 dark:bg-slate-800 hover:bg-[#0059bb]/10 text-slate-600 dark:text-slate-400 hover:text-[#0059bb] text-[9px] sm:text-[10px] font-bold transition-all cursor-pointer"
                >
                  #MeoHocTuVung
                </button>
                <button
                  onClick={() => setPostText((prev) => (prev ? `${prev} #LuyenThiTOEIC` : '#LuyenThiTOEIC '))}
                  className="px-1.5 py-0.5 rounded-xs bg-slate-100 dark:bg-slate-800 hover:bg-[#0059bb]/10 text-slate-600 dark:text-slate-400 hover:text-[#0059bb] text-[9px] sm:text-[10px] font-bold transition-all cursor-pointer"
                >
                  #LuyenThiTOEIC
                </button>
                <button
                  onClick={() => setPostText((prev) => (prev ? `${prev} #IELTSWriting` : '#IELTSWriting '))}
                  className="px-1.5 py-0.5 rounded-xs bg-slate-100 dark:bg-slate-800 hover:bg-[#0059bb]/10 text-slate-600 dark:text-slate-400 hover:text-[#0059bb] text-[9px] sm:text-[10px] font-bold transition-all cursor-pointer"
                >
                  #IELTSWriting
                </button>
              </div>

              <Button
                variant="primary"
                size="sm"
                onClick={handleCreatePost}
                disabled={!postText.trim()}
                className="font-bold py-1.5 px-2.5 sm:px-3.5 rounded-xs bg-[#0059bb] hover:bg-[#004799] text-white text-xs transition-all shadow-2xs flex items-center justify-center gap-1 sm:gap-1.5 cursor-pointer disabled:opacity-50 shrink-0 self-auto"
              >
                <Send className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span className="sm:hidden">Chia sẻ (+20 XP)</span>
                <span className="hidden sm:inline">Chia sẻ bài viết (+20 XP)</span>
              </Button>
            </div>
          </div>

          {/* POSTS FEED STREAM */}
          <div className="space-y-3">
            {loading ? (
              /* SKELETON LOADING CARDS */
              <div className="space-y-3">
                {[1, 2].map((i) => (
                  <div key={i} className="p-3 sm:p-4 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-3 animate-pulse">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-200 dark:bg-slate-800" />
                      <div className="space-y-1.5 flex-1">
                        <div className="w-32 h-4 bg-slate-200 dark:bg-slate-800 rounded-xs" />
                        <div className="w-24 h-3 bg-slate-100 dark:bg-slate-800/60 rounded-xs" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="w-full h-4 bg-slate-100 dark:bg-slate-800/60 rounded-xs" />
                      <div className="w-3/4 h-4 bg-slate-100 dark:bg-slate-800/60 rounded-xs" />
                    </div>
                  </div>
                ))}
              </div>
            ) : posts.length === 0 ? (
              /* EMPTY STATE */
              <div className="p-6 sm:p-8 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs text-center space-y-2">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xs bg-[#0059bb]/10 text-[#0059bb] dark:text-sky-400 flex items-center justify-center mx-auto text-lg sm:text-xl border border-[#0059bb]/20">
                  💬
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display">
                  Chưa có bài viết nào trên bảng tin
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed font-medium">
                  Hãy trở thành người đầu tiên chia sẻ mẹo học tập hoặc từ vựng mới để nhận +20 XP thưởng nhé!
                </p>
              </div>
            ) : (
              posts.map((p) => {
                const allComments = p.comments || [];
                const totalComments = p.commentsCount || allComments.length;
                const limit = getVisibleCount(p.id);
                const shownComments = allComments.slice(0, limit);
                const hiddenCount = allComments.length - shownComments.length;
                const serverHiddenCount = totalComments - allComments.length;

                const authorCleanName = formatCleanName(p.author);
                const isUserPost = p.author === user?.fullName || p.author === user?.username || p.author === user?.email || authorCleanName === currentUserName;
                const postAvatar = p.authorAvatar || p.avatar || p.avatarUrl || (isUserPost ? currentUserAvatar : undefined);

                return (
                  <div
                    key={p.id}
                    className="p-3 sm:p-4 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-2 sm:space-y-2.5"
                  >
                    {/* Post Author Header (Clean single name, Google/FB avatar, NO @ symbol) */}
                    <div className="flex items-center justify-between gap-2.5 border-b border-slate-100 dark:border-white/5 pb-2">
                      <div className="flex items-center gap-2 sm:gap-2.5">
                        <UserAvatar
                          avatar={postAvatar}
                          avatarUrl={postAvatar}
                          imageUrl={postAvatar}
                          emoji={p.avatarEmoji}
                          name={authorCleanName}
                          size="w-8 h-8 sm:w-9 sm:h-9"
                        />
                        <div>
                          <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display flex items-center gap-1.5">
                            <span>{authorCleanName}</span>
                            <span className="px-1 py-0.2 sm:px-1.5 sm:py-0.2 rounded-xs text-[8.5px] sm:text-[9px] font-black uppercase bg-[#0059bb]/10 text-[#0059bb] dark:text-sky-400 border border-[#0059bb]/20">
                              Member
                            </span>
                          </div>
                          <div className="text-[10px] text-slate-400 font-medium">
                            {p.meta || 'Vừa xong'}
                          </div>
                        </div>
                      </div>

                      <span className="text-[9px] sm:text-[10px] font-bold text-emerald-600 bg-emerald-500/10 px-1.5 py-0.5 sm:px-2 sm:py-0.5 rounded-xs border border-emerald-500/20 shrink-0">
                        +20 XP
                      </span>
                    </div>

                    {/* Post Content Text */}
                    <div className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                      {p.content}
                    </div>

                    {/* Vocab Tags */}
                    {p.vocabTags && p.vocabTags.length > 0 && (
                      <div className="flex flex-wrap gap-1 sm:gap-1.5">
                        {p.vocabTags.map((tag: string, idx: number) => (
                          <span
                            key={idx}
                            className="text-[9px] sm:text-[10px] font-bold py-0.5 px-1.5 sm:px-2 rounded-xs bg-blue-50 dark:bg-blue-950/40 text-[#0059bb] dark:text-sky-400 border border-blue-200/60 dark:border-blue-900/40"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Post Reaction Stats Bar */}
                    <div className="flex items-center gap-3 sm:gap-4 py-1.5 border-y border-slate-100 dark:border-white/5 text-[10px] sm:text-[11px] font-bold text-slate-500 dark:text-slate-400">
                      <span className="flex items-center gap-1">
                        <Heart className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-rose-500 fill-rose-500" /> {p.likes || 0} Lượt thích
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#0059bb] dark:text-sky-400" /> {totalComments} Bình luận
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleLikePost(p.id)}
                        className={`flex-1 py-1.5 px-2.5 sm:px-3 rounded-xs text-xs font-bold border transition-all cursor-pointer flex items-center justify-center gap-1 sm:gap-1.5 ${
                          p.liked
                            ? 'bg-rose-50 dark:bg-rose-950/30 text-rose-600 border-rose-200 dark:border-rose-900/40'
                            : 'bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-white/10 hover:bg-rose-50 hover:text-rose-600'
                        }`}
                      >
                        <Heart className={`w-3.5 h-3.5 ${p.liked ? 'fill-rose-500 text-rose-500' : ''}`} />
                        <span>{p.liked ? 'Đã thích' : 'Thích'}</span>
                      </button>

                      <button
                        onClick={() => setActiveCommentId(activeCommentId === p.id ? null : p.id)}
                        className="flex-1 py-1.5 px-2.5 sm:px-3 rounded-xs text-xs font-bold bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-white/10 hover:bg-[#0059bb] hover:text-white transition-all cursor-pointer flex items-center justify-center gap-1 sm:gap-1.5"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-[#0059bb] dark:text-sky-400" />
                        <span>Bình luận</span>
                      </button>
                    </div>

                    {/* Expandable Comments Section */}
                    {activeCommentId === p.id && (
                      <div className="pt-2 sm:pt-2.5 border-t border-slate-100 dark:border-white/5 space-y-2 sm:space-y-2.5">
                        {/* Comment Input */}
                        <div className="flex items-center gap-1.5 sm:gap-2">
                          <input
                            type="text"
                            value={commentText[p.id] || ''}
                            onChange={(e) => setCommentText((prev) => ({ ...prev, [p.id]: e.target.value }))}
                            onKeyDown={(e) => e.key === 'Enter' && handleAddComment(p.id)}
                            placeholder="Viết bình luận của bạn..."
                            className="flex-1 p-1.5 sm:p-2 rounded-xs bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/10 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#0059bb] font-medium"
                          />
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => handleAddComment(p.id)}
                            disabled={!commentText[p.id]?.trim()}
                            className="py-1.5 px-2.5 rounded-xs bg-[#0059bb] text-white text-xs font-bold cursor-pointer disabled:opacity-50 flex items-center gap-1 shrink-0"
                          >
                            <Send className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Gửi
                          </Button>
                        </div>

                        {serverHiddenCount > 0 && (
                          <div className="text-center">
                            <span className="text-[10px] text-slate-400 font-bold italic">
                              Có {serverHiddenCount} bình luận cũ hơn không hiển thị
                            </span>
                          </div>
                        )}

                        {/* Comment List Stream */}
                        <div className="space-y-1.5 sm:space-y-2">
                          {shownComments.map((c: any) => {
                            const commentCleanName = formatCleanName(c.author);
                            const isCommentUser = c.author === user?.fullName || c.author === user?.username || c.author === user?.email || commentCleanName === currentUserName;
                            const commentAvatar = c.authorAvatar || c.avatar || c.avatarUrl || (isCommentUser ? currentUserAvatar : undefined);

                            return (
                              <div
                                key={c.id}
                                className="p-2 sm:p-2.5 rounded-xs bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-white/5 space-y-1"
                              >
                                <div className="flex items-center gap-2">
                                  <UserAvatar
                                    avatar={commentAvatar}
                                    avatarUrl={commentAvatar}
                                    imageUrl={commentAvatar}
                                    emoji={c.avatarEmoji}
                                    name={commentCleanName}
                                    size="w-5 h-5 sm:w-6 sm:h-6"
                                  />
                                  <span className="font-bold text-slate-900 dark:text-white font-display text-xs">
                                    {commentCleanName}
                                  </span>
                                </div>
                                <p className="text-xs text-slate-800 dark:text-slate-200 font-medium leading-relaxed pl-7 sm:pl-8">
                                  {c.content}
                                </p>
                              </div>
                            );
                          })}
                        </div>

                        {hiddenCount > 0 && (
                          <button
                            onClick={() => handleShowMoreComments(p.id)}
                            className="w-full py-1 text-[10px] sm:text-[11px] font-bold text-[#0059bb] dark:text-sky-400 hover:underline flex items-center justify-center gap-1 cursor-pointer"
                          >
                            <ChevronDown className="w-3.5 h-3.5" />
                            Xem thêm {Math.min(hiddenCount, LOAD_MORE_COMMENTS)} bình luận ({hiddenCount} còn ẩn)
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* RIGHT 1/4 COLUMN: BENTO SIDEBAR WIDGETS */}
        <div className="lg:col-span-4 xl:col-span-4 space-y-3.5 sm:space-y-4 sticky top-4">
          
          {/* BENTO WIDGET 1: TOP 3 LEADERBOARD SPOTLIGHT */}
          <div className="p-3.5 sm:p-4 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-2.5 sm:space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2.5">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xs bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/20 text-sm sm:text-base">
                  🏆
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display">
                  Top 3 Học Viên Tuần
                </h3>
              </div>

              <Link
                href="/community/leaderboard"
                className="text-[10px] sm:text-[11px] font-bold text-[#0059bb] dark:text-sky-400 hover:underline flex items-center gap-0.5"
              >
                Xem tất cả <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="space-y-2">
              <div className="p-2 sm:p-2.5 rounded-xs bg-amber-500/10 border border-amber-500/20 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold">🥇</span>
                  <UserAvatar
                    avatar={currentUserAvatar}
                    name={currentUserName}
                    size="w-5 h-5"
                  />
                  <span className="font-bold text-slate-900 dark:text-white">{currentUserName}</span>
                </div>
                <span className="font-black text-amber-600 dark:text-amber-400 text-xs">{(user?.totalXp || 1450).toLocaleString()} XP</span>
              </div>

              <div className="p-2 sm:p-2.5 rounded-xs bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-white/5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold">🥈</span>
                  <UserAvatar name="Thanh Hằng" size="w-5 h-5" />
                  <span className="font-bold text-slate-900 dark:text-white">Thanh Hằng</span>
                </div>
                <span className="font-bold text-slate-600 dark:text-slate-400 text-xs">1,280 XP</span>
              </div>

              <div className="p-2 sm:p-2.5 rounded-xs bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-white/5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold">🥉</span>
                  <UserAvatar name="Hoàng Nam" size="w-5 h-5" />
                  <span className="font-bold text-slate-900 dark:text-white">Hoàng Nam</span>
                </div>
                <span className="font-bold text-slate-600 dark:text-slate-400 text-xs">1,120 XP</span>
              </div>
            </div>
          </div>

          {/* BENTO WIDGET 2: ACTIVE STUDY GROUPS */}
          <div className="p-3.5 sm:p-4 rounded-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs space-y-2.5 sm:space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2.5">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xs bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-500/20 text-sm sm:text-base">
                  👥
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display">
                  Nhóm Học Nổi Bật
                </h3>
              </div>

              <Link
                href="/community/groups"
                className="text-[10px] sm:text-[11px] font-bold text-[#0059bb] dark:text-sky-400 hover:underline flex items-center gap-0.5"
              >
                Tham gia <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="space-y-2">
              <div className="p-2 sm:p-2.5 rounded-xs bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-white/5 space-y-0.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900 dark:text-white">CLB IELTS Speaking 7.0+</span>
                  <span className="text-[9px] sm:text-[10px] font-bold text-indigo-600 bg-indigo-500/10 px-1.5 py-0.2 rounded-xs">320 TV</span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400">Luyện nói hàng ngày cùng phòng nói AI</p>
              </div>

              <div className="p-2 sm:p-2.5 rounded-xs bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-white/5 space-y-0.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900 dark:text-white">Hội Cày 3000 Từ Vựng TOEIC</span>
                  <span className="text-[9px] sm:text-[10px] font-bold text-emerald-600 bg-emerald-500/10 px-1.5 py-0.2 rounded-xs">540 TV</span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400">Thi đấu Flashcard & Streak mỗi tuần</p>
              </div>
            </div>
          </div>

          {/* BENTO WIDGET 3: AI COMMUNITY DAILY TIP */}
          <div className="p-3.5 sm:p-4 rounded-xs bg-[#ebf3fe]/80 dark:bg-slate-800/60 border border-[#0059bb]/20 shadow-2xs space-y-1.5 sm:space-y-2">
            <div className="flex items-center gap-1.5 sm:gap-2 text-xs font-bold text-[#0059bb] dark:text-sky-400 font-display">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Mẹo AI Ghi Nhớ Nhanh Hàng Ngày
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              "Hãy tự đặt 1 câu áp dụng ngay từ vựng mới học vào bài đăng cộng đồng để duy trì thói quen ghi nhớ chủ động (Active Recall)."
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}